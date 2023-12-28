import path from "path";
import encryptWorker from "../workers/encrypt?nodeWorker";
import decryptWorker from "../workers/decrypt?nodeWorker";
import fs from "fs";
import fsp from "fs/promises";
import { SafeManager } from "./safe-manager";
import { readByLine } from "../lib";

type Value = string | number | boolean | null;

export interface Entry {
  index: Value;
  name: Value;
  password: Value;
  email?: Value;
  icon?: Value;
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
  public static readonly delimiter = ",";
  private readonly headers = ["index", "name", "password", "email", "icon"] as const;
  public name: string;
  private path: string;

  public constructor(opts: SafeOptions) {
    this.name = opts.name;
    this.path = path.join(SafeManager.SafesFolder, this.name);

    this.init();
  }

  public getPath() {
    return this.path;
  }

  public getName() {
    return this.name;
  }

  public getHeaders() {
    return this.headers;
  }

  public getDelimiter() {
    return Safe.delimiter;
  }

  private init() {
    if (!fs.existsSync(this.getPath())) {
      fs.writeFileSync(this.getPath(), this.getHeaders().join(this.getDelimiter()));
    }
  }

  public async read(password: string) {
    let buffer = await this.decrypt(password);

    let decrypted = Buffer.from(buffer).toString("utf-8").split("\n");
    let rows: Entry[] = [];

    for (let i = 1; i < decrypted.length; i++) {
      let line = decrypted[i];
      let parsed = line.split(this.getDelimiter());
      let row: Entry = {} as Entry;

      for (let j = 0; j < this.getHeaders().length; j++) {
        let [h, v] = [this.getHeaders()[j], parsed[j]];

        if (!v) {
          row[h] = null;
        } else if (typeof v === "number") {
          row[h] = +v;
        } else {
          row[h] = v;
        }
      }

      rows.push(row);
    }

    return rows;
  }

  public async write(entries: Entry | Entry[]) {
    if (!Array.isArray(entries)) entries = [entries];

    let writer = fs.createWriteStream(this.getPath(), { flags: "a" });

    for (let i = 0; i < entries.length; i++) {
      let entry = entries[i];
      let line = this.getHeaders()
        .map(h => entry[h])
        .join(this.getDelimiter());

      writer.write("\n" + line);
    }

    writer.end();

    return new Promise((res, rej) => {
      writer.on("error", rej);
      writer.on("finish", res);
    });
  }

  public async encrypt(password: string, buffer?: Buffer): Promise<boolean> {
    return new Promise(async (res, rej) => {
      buffer = buffer ?? (await fsp.readFile(this.getPath()));
      let worker = encryptWorker({ workerData: { buffer, password } });

      worker.on("error", rej);

      worker.on("message", async data => {
        let { encrypted, salt, iv } = data;
        let writer = fs.createWriteStream(this.getPath());

        writer.write(salt + "\n");
        writer.write(iv + "\n");
        writer.write(encrypted);

        worker.terminate();

        writer.end();

        writer.on("error", err => rej(err));
        writer.on("finish", () => res(true));
      });
    });
  }

  public async decrypt(password: string): Promise<Buffer> {
    return new Promise(async (res, rej) => {
      let lines: string[] = [];

      await readByLine(this.getPath(), line => lines.push(line));

      let worker = decryptWorker({ workerData: { lines, password } });

      worker.on("error", rej);

      worker.on("message", data => {
        worker.terminate();
        res(data);
      });
    });
  }
}

export { Safe };
