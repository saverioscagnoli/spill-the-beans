import path from "path";
import encryptWorker from "../workers/encrypt?nodeWorker";
import decryptWorker from "../workers/decrypt?nodeWorker";
import fs from "fs";
import fsp from "fs/promises";
import { SafeManager } from "./safe-manager";
import { bufferFromCSV, parseCSV } from "../lib";
import { app } from "electron";

export interface Entry {
  name: string;
  password: string;
  email?: string;
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

  public async read(password: string) {
    let bytes = await this.decrypt(password);
    return parseCSV(Buffer.from(bytes));
  }

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
