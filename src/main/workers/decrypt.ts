import { workerData, parentPort } from "worker_threads";
import crypto from "crypto";
import { ENCRYPTION_ALGORITHM, IV_LENGTH, SALT_LENGTH, deriveKey } from "../lib";

async function main() {
  let { buffer, password } = workerData as { buffer: Buffer; password: string };
  let salt = Buffer.from(buffer.subarray(0, SALT_LENGTH)).toString("ascii");
  let iv = buffer.subarray(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  let encrypted = buffer.subarray(SALT_LENGTH + IV_LENGTH);

  let key = await deriveKey(password, salt);

  let decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);

  let decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  parentPort?.postMessage(decrypted);
}

main();
