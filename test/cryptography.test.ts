import { describe, test, expect, afterAll } from "vitest";
import { generateRandomEnties } from "./utils";
import { faker } from "@faker-js/faker";
import {
  bufferFromCSV,
  deriveKey,
  SALT_ROUNDS,
  IV_LENGTH,
  ENCRYPTION_ALGORITHM
} from "../app/src/main/lib";
import path from "path";
import fsp from "fs/promises";
import bcrypt from "bcrypt";
import crypto from "crypto";

/**
 * This test file assures that the encryption and decryption
 * process works as expected.
 *
 * The encrypt and decrypt functions are defined in
 * src/main/workers/encrypt.ts and src/main/workers/decrypt.ts.
 * The worker files are a bit different, but the logic is the same.
 * It is just that the worker files cannot be used in a test file.
 *
 * IGNORE TypeError: The "path" argument must be of type string or an instance of Buffer or URL. Received undefined
 * Because the file where the functions are from uses a worker, which is not available in the test environment.
 */

async function encrypt(
  buffer: Buffer,
  password: string
): Promise<[string, string, string]> {
  let salt = await bcrypt.genSalt(SALT_ROUNDS);
  let iv = crypto.randomBytes(IV_LENGTH);
  let key = await deriveKey(password, salt);

  let cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv).setAutoPadding(true);
  let encrypted = Buffer.concat([cipher.update(buffer), cipher.final()]);

  return [salt, iv.toString("hex"), encrypted.toString("hex")];
}

async function decrypt(enc: [string, string, string], password: string): Promise<Buffer> {
  let [salt, iv, encrypted] = enc;
  let key = await deriveKey(password, salt);

  let decipher = crypto
    .createDecipheriv(ENCRYPTION_ALGORITHM, key, Buffer.from(iv, "hex"))
    .setAutoPadding(true);

  let decrypted = Buffer.concat([
    decipher.update(Buffer.from(encrypted, "hex")),
    decipher.final()
  ]);

  return decrypted;
}

describe("cryptography - encrypt and decrypt a safe", async () => {
  let entries = generateRandomEnties(1000);
  let pw = faker.internet.password();

  const safePath = path.join(__dirname, "safe.csv");

  test("encrypt", async () => {
    let buffer = bufferFromCSV(entries);
    let [salt, iv, encrypted] = await encrypt(buffer, pw);

    await fsp.writeFile(safePath, salt + "\n" + iv + "\n" + encrypted);

    let content = await fsp.readFile(safePath, "utf-8");
    let splitted = content.split("\n");

    expect(splitted.shift()).toEqual(salt);
    expect(splitted.shift()).toEqual(iv);
    expect(splitted.join("\n")).toEqual(encrypted);
  });

  test("decrypt", async () => {
    let content = await fsp.readFile(safePath, "utf-8");
    let splitted = content.split("\n");
    let [salt, iv, encrypted] = splitted;

    let decrypted = await decrypt([salt, iv, encrypted], pw);
    let parsed = bufferFromCSV(entries);

    expect(decrypted).toEqual(parsed);
  });

  test("decrypt with wrong password", async () => {
    let content = await fsp.readFile(safePath, "utf-8");
    let splitted = content.split("\n") as [string, string, string];

    await expect(decrypt(splitted, "wrong!!")).rejects.toThrow();
  });

  afterAll(async () => {
    await fsp.unlink(safePath);
  });
});
