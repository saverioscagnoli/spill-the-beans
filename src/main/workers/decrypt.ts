import { workerData, parentPort } from "worker_threads";
import crypto from "crypto";
import { ENCRYPTION_ALGORITHM, deriveKey } from "../lib";

async function main() {
  let { lines, password } = workerData as { lines: string[]; password: string };

  let salt = lines.shift()!;
  let iv = Buffer.from(lines.shift()!, "hex");
  let encrypted = Buffer.from(lines.join("\n"), "base64");

  let key = await deriveKey(password, salt);

  let decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);

  let decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  parentPort?.postMessage(decrypted);
}

main();
