import { CSV } from "csv-rw";
import { SAFE_HEADERS } from "../lib";
import path from "path";
import { app } from "electron";
import encryptWorker from "../workers/encrypt?nodeWorker";
import decryptWorker from "../workers/decrypt?nodeWorker";
import fs from "fs/promises";

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
 * - notes
 * - icon
 */
class Safe extends CSV<(typeof SAFE_HEADERS)[number]> {
  public static readonly folder = path.join(app.getPath("userData"), "Safes");
  public name: string;

  public constructor({ name }: SafeOptions) {
    super({ path: path.join(Safe.folder, name), headers: [...SAFE_HEADERS] });
    this.name = name;
  }

  /**
   * Encrypts the csv file.
   * @param password The password input from the user.
   * @returns A boolean indicating whether the encryption was successful.
   */
  public async encrypt(password: string): Promise<boolean> {
    return new Promise((res, rej) => {
      let buffer = fs.readFile(this.path);
      let worker = encryptWorker({ workerData: { buffer, password } });

      worker.on("error", rej);

      worker.on("message", async (data: Buffer) => {
        await fs.writeFile(this.path, data);
        res(true);
      });
    });
  }

  /**
   * Decrypts the csv file.
   * @param password The password input from the user.
   * @param write Wheter to write the decrypted file to disk.
   * @returns A boolean indicating whether the decryption was successful.
   */
  public async decrypt(password: string, write: boolean = true): Promise<boolean> {
    return new Promise(async (res, rej) => {
      let buffer = await fs.readFile(this.path);
      let worker = decryptWorker({ workerData: { buffer, password } });

      worker.on("error", rej);

      worker.on("message", async (data: Buffer) => {
        if (write) {
          await fs.writeFile(this.path, data);
        }
        res(true);
      });
    });
  }
}

export { Safe };
