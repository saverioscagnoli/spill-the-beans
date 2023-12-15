import { createCipheriv, createDecipheriv, pbkdf2Sync, randomBytes } from "crypto";
import { genSaltSync } from "bcrypt";
import { createReadStream, createWriteStream, renameSync, unlinkSync } from "fs";
import "dotenv/config";

function generateKey(password: string, salt: string) {
  return pbkdf2Sync(password, salt, 100000, 32, "sha512").toString("hex");
}

function encrypt(path: string, password: string): Promise<void> {
  return new Promise(res => {
    let salt = genSaltSync(16);
    let iv = randomBytes(16);

    let key = generateKey(password, salt);

    let cipher = createCipheriv(process.env.ALGORITHM!, key, iv);
    let writeStream = createWriteStream(path + ".tmp");

    writeStream.write(salt);
    writeStream.write(iv);

    createReadStream(path).pipe(cipher).pipe(writeStream);

    writeStream.on("finish", () => {
      renameSync(path + ".tmp", path);
      res();
    });
  });
}

function decrypt(path: string, password: string): Promise<boolean> {
  return new Promise(res => {
    let saltReadStream = createReadStream(path);
    let salt: Buffer, iv: Buffer;

    saltReadStream.on("readable", () => {
      if (!salt) {
        salt = saltReadStream.read(16);
      }

      if (!iv) {
        iv = saltReadStream.read(16);
      }

      if (salt && iv) {
        saltReadStream.close();

        let key = generateKey(password, salt.toString("hex"));
        let decipher = createDecipheriv(process.env.ALGORITHM!, key, iv);

        decipher.on("error", () => res(false));

        let readStream = createReadStream(path, { start: 32 });
        let writeStream = createWriteStream(path + ".tmp");

        readStream.pipe(decipher).pipe(writeStream);

        writeStream.on("finish", () => {
          unlinkSync(path);
          renameSync(path + ".tmp", path);
          res(true);

          writeStream.close();
        });
      }
    });
  });
}

export { encrypt, decrypt };
