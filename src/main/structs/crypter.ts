import bcrypt from "bcrypt";
import crypto from "crypto";
import fs from "fs";

interface CrypterOptions {
  path: string;
  pbkdf2Iterations?: number;
  algorithm?: string;
}

class Crypter {
  private readonly saltLength = 29;
  private readonly saltRounds = 16;
  private readonly ivLength = 16;

  private path: string;
  private pbkdf2Iterations: number;
  private algorithm: string;

  public constructor({ path, pbkdf2Iterations, algorithm }: CrypterOptions) {
    this.path = path;
    this.pbkdf2Iterations = pbkdf2Iterations ?? 100000;
    this.algorithm = algorithm ?? process.env.ALGORITHM! ?? "aes-256-gcm";
  }

  private async deriveKey(password: string, salt: string) {
    let hashed = await bcrypt.hash(password, salt);
    return crypto
      .pbkdf2Sync(hashed, salt, this.pbkdf2Iterations, 16, "sha512")
      .toString("hex");
  }

  private async encryptBuffer(buffer: Buffer, password: string) {
    let salt = await bcrypt.genSalt(this.saltRounds);
    let iv = crypto.randomBytes(this.ivLength);

    let key = await this.deriveKey(password, salt);
    let cipher = crypto.createCipheriv(this.algorithm, key, iv);

    return Buffer.concat([Buffer.from(salt), iv, cipher.update(buffer), cipher.final()]);
  }

  private async decryptBuffer(buffer: Buffer, password: string) {
    let salt = buffer.subarray(0, this.saltLength).toString("ascii");
    let iv = buffer.subarray(this.saltLength, this.saltLength + this.ivLength);
    let encrypted = buffer.subarray(this.saltLength + this.ivLength);

    let key = await this.deriveKey(password, salt);

    let decipher = crypto.createDecipheriv(this.algorithm, key, iv);

    return Buffer.concat([decipher.update(encrypted), decipher.final()]);
  }

  private async read(): Promise<Buffer> {
    return new Promise((res, rej) => {
      fs.readFile(this.path, (err, data) => {
        if (err) rej(err);
        else res(data);
      });
    });
  }

  private async write(data: Buffer): Promise<void> {
    return new Promise((res, rej) => {
      fs.writeFile(this.path, data, err => {
        if (err) rej(err);
        else res();
      });
    });
  }

  public async encrypt(password: string) {
    let plain = await this.read();
    let encrypted = await this.encryptBuffer(plain, password);
    await this.write(encrypted);
    return encrypted;
  }

  public async decrypt(password: string) {
    let encrypted = await this.read();
    let decrypted = await this.decryptBuffer(encrypted, password);
    await this.write(decrypted);
    return decrypted;
  }
}

export { Crypter };
