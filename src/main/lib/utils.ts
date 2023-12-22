import crypto from "crypto";
import bcrypt from "bcrypt";
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

async function deriveKey(password: string, salt: string): Promise<string> {
  return new Promise(async (res, rej) => {
    let hashed = await bcrypt.hash(password, salt);
    crypto.pbkdf2(hashed, salt, PBKDF2_ITERATIONS, 16, "sha512", (err, derivedKey) => {
      if (err) rej(err);
      else res(derivedKey.toString("hex"));
    });
  });
}

/**
 * Returns the url of the image to use in the src attribute of an img tag.
 * @param ext the extension of the image
 * @param base64 the base64 string of the image
 * @returns the url of the image to use in the src attribute of an img tag
 */
function getImageUrl(ext: string, base64: string): string {
  return `data:image/${ext};base64,${base64}`;
}

interface RngOptions {
  /**
   * The range minimum
   */
  min: number;

  /**
   * The range maximum
   */
  max: number;
}

function rng({ min, max }: RngOptions): number {
  return crypto.randomInt(min, max + 1);
}

/**
 * Picks a random element from an array.
 * @param arr The array to pick from.
 * @returns The random element.
 */
function pick<T>(arr: T[]): T {
  return arr[rng({ min: 0, max: arr.length - 1 })];
}

interface PasswordFlags {
  /**
   * The length of the password.
   */
  length: number;

  /**
   * Whether to include numbers
   */
  numbers?: boolean;

  /**
   * Whether to include symbols
   */
  symbols?: boolean;

  /**
   * Whether to include uppercase letters
   */
  uppercase?: boolean;

  /**
   * Whether to include lowercase letters
   */
  lowercase?: boolean;

  /**
   * The characters to exclude
   */
  exclude?: string;
}

function generatePassword({
  length,
  numbers = true,
  symbols = true,
  uppercase = true,
  lowercase = true,
  exclude = ""
}: PasswordFlags) {
  const pool = [
    ...(numbers ? "0123456789" : ""),
    ...(symbols ? "!@#$%^&*()_+-=[]{};:,./<>?" : ""),
    ...(uppercase ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ" : ""),
    ...(lowercase ? "abcdefghijklmnopqrstuvwxyz" : "")
  ].filter(c => !exclude.includes(c));

  if (pool.length === 0) return "404";

  return Array.from({ length }, () => pick(pool)).join("");
}

export { readFileWithWorker, deriveKey, getImageUrl, generatePassword, rng, pick };
export { type PasswordFlags };
