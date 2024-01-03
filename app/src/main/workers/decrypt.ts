import { workerData, parentPort } from "worker_threads";
import crypto from "crypto";
import { ENCRYPTION_ALGORITHM, deriveKey } from "../lib";

async function main() {
  let { enc, password } = workerData as {
    enc: [string, string, string];
    password: string;
  };

  let [salt, iv, encrypted] = enc;
  let key = await deriveKey(password, salt);

  let decipher = crypto
    .createDecipheriv(ENCRYPTION_ALGORITHM, key, Buffer.from(iv, "hex"))
    .setAutoPadding(true);

  let decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, "hex")),
    decipher.final()
  ]);

  parentPort?.postMessage(decrypted);
}

main();
