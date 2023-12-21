import crypto from "crypto";
import { PBKDF2_ITERATIONS } from "./consts";
import readFileWorker from "../workers/read-file?nodeWorker";

async function readFileWithWorker(path: string): Promise<Buffer> {
  return new Promise((res, rej) => {
    let worker = readFileWorker({ workerData: { path } });

    worker.on("error", rej);

    worker.on("message", (data: Buffer) => {
      res(data);
    });
  });
}

async function deriveKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((res, rej) => {
    crypto.pbkdf2(password, salt, PBKDF2_ITERATIONS, 16, "sha512", (err, derivedKey) => {
      if (err) rej(err);
      else res(derivedKey);
    });
  });
}

export { readFileWithWorker, deriveKey };
