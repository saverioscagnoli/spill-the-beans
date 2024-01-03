import path from "path";
import encryptWorker from "../workers/encrypt?nodeWorker";
import decryptWorker from "../workers/decrypt?nodeWorker";
import fs from "fs";
import fsp from "fs/promises";
import { bufferFromCSV, parseCSV } from "../lib";
import { app } from "electron";

interface Entry {
  /**
   * The name of the entry.
   */
  name: string;

  /**
   * The password of the entry.
   */
  password: string;

  /**
   * The email of the entry.
   */
  email?: string;

  /**
   * The icon of the entry.
   */
  icon?: string;
}

interface SafeOptions {
  /**
   * The path to the safe file.
   */
  name: string;
}

/**
 * A class that represents a safe file.
 * It is a CSV file with the following headers:
 * - index
 * - name
 * - password
 * - email
 * - icon
 */

class Safe {
  public name: string;
  private path: string;

  public constructor(opts: SafeOptions) {
    this.name = opts.name;
    this.path = path.join(app.getPath("userData"), "Safes", this.name);
  }

  public getPath() {
    return this.path;
  }

  public getName() {
    return this.name;
  }

  /**
   * Reads the safe file and returns the entries, without writing to file.
   *
   * @param password The password to decrypt the safe with.
   * @returns
   */
  public async read(password: string) {
    let bytes = await this.decrypt(password);
    return parseCSV(Buffer.from(bytes));
  }

  /**
   * Writes the entries to the safe file.
   *
   * @param password The password to encrypt the safe with.
   * @param entries The entries to write to the safe.
   */
  public async write(password: string, entries: Entry | Entry[]) {
    if (!Array.isArray(entries)) entries = [entries];

    let buffer = bufferFromCSV(entries);
    let [salt, iv, encrypted] = await this.encrypt(password, buffer);

    let writer = fs.createWriteStream(this.getPath(), "utf-8");

    return new Promise((res, rej) => {
      writer.on("error", rej);
      writer.on("finish", res);

      writer.write(salt + "\n");
      writer.write(iv + "\n");
      writer.write(encrypted);
      writer.end();
    });
  }

  /**
   * Encrypts a buffer with a password.
   *
   * @param password The password to encrypt the safe with.
   * @param buffer The buffer to encrypt.
   * @returns The salt, iv and encrypted buffer.
   */
  public async encrypt(
    password: string,
    buffer: Buffer
  ): Promise<[string, Buffer, Buffer]> {
    let worker = encryptWorker({ workerData: { buffer, password } });

    return new Promise((res, rej) => {
      worker.on("error", rej);

      worker.on("message", async data => {
        worker.terminate();
        res(data);
      });
    });
  }

  /**
   * Decrypts a buffer with a password.
   *
   * @param password The password to decrypt the safe with.
   * @returns The decrypted buffer.
   */
  public async decrypt(password: string): Promise<Buffer> {
    let buffer = await fsp.readFile(this.getPath());
    let lines = buffer.toString().split("\n");
    let [salt, iv] = lines.slice(0, 2);
    let enc = lines.slice(2).join("\n");
    let worker = decryptWorker({ workerData: { enc: [salt, iv, enc], password } });

    return new Promise((res, rej) => {
      worker.on("error", rej);

      worker.on("message", async data => {
        worker.terminate();
        res(data);
      });
    });
  }
}

export { Safe };
export type { Entry };
