import crypto from "crypto";
import bcrypt from "bcrypt";
import { readFile, writeFile } from "./utils";
import "dotenv/config";

const algorithm = process.env.ALGORITHM ?? "aes-256-gcm";
const saltRounds = 14;
const saltLength = 29;
const ivLength = 16;
const pbkdf2Iterations = 100000;

async function deriveKey(password: string, salt: string) {
  let hashed = await bcrypt.hash(password, salt);
  return crypto.pbkdf2Sync(hashed, salt, pbkdf2Iterations, 16, "sha512").toString("hex");
}

async function encryptBuffer(buffer: Buffer, password: string) {
  let salt = await bcrypt.genSalt(saltRounds);
  let iv = crypto.randomBytes(ivLength);

  let key = await deriveKey(password, salt);
  let cipher = crypto.createCipheriv(algorithm, key, iv);

  return Buffer.concat([Buffer.from(salt), iv, cipher.update(buffer), cipher.final()]);
}

async function decryptBuffer(buffer: Buffer, password: string) {
  let salt = buffer.subarray(0, saltLength).toString("ascii");
  let iv = buffer.subarray(saltLength, saltLength + ivLength);
  let encrypted = buffer.subarray(saltLength + ivLength);

  let key = await deriveKey(password, salt);

  let decipher = crypto.createDecipheriv(algorithm, key, iv);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]);
}

async function encrypt(path: string, password: string) {
  let content = await readFile(path);
  let encrypted = await encryptBuffer(content, password);

  await writeFile(path, encrypted);
  return encrypted;
}

async function decrypt(path: string, password: string) {
  let content = await readFile(path);
  let decrypted = await decryptBuffer(content, password);

  await writeFile(path, decrypted);
  return decrypted;
}

async function checkPassword(path: string, password: string) {
  try {
    let content = await readFile(path);
    await decryptBuffer(content, password);
    return true;
  } catch {
    return false;
  }
}

export { encrypt, decrypt, checkPassword };
