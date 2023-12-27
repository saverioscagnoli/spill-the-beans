import { workerData, parentPort } from "worker_threads";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { deriveKey, ENCRYPTION_ALGORITHM, IV_LENGTH, SALT_ROUNDS } from "../lib";

async function main() {
  let { buffer, password } = workerData as { buffer: Buffer; password: string };

  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let iv = crypto.randomBytes(IV_LENGTH);

  let key = await deriveKey(password, salt);

  let cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  let encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  parentPort?.postMessage({
    encrypted: encrypted.toString("base64"),
    iv: iv.toString("hex"),
    salt
  });
}

main();
