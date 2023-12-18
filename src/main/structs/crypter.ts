import crypto from "crypto";
import bcrypt from "bcrypt";
import fs from "fs";
import { deleteFile, renameFile } from "../lib";
import "dotenv/config";

const SALT_LENGTH = 29;
const IV_LENGTH = 16;

async function checkPassword(path: string, password: string): Promise<boolean> {
  let res: boolean;
  try {
    res = await decryptLogic(path, password, true);
  } catch {
    return false;
  }

  return res;
}

function deriveKey(password: string, salt: string) {
  let hashed = bcrypt.hashSync(password, salt);
  return crypto.pbkdf2Sync(hashed, salt, 100000, 16, "sha512").toString("hex");
}

function encrypt(path: string, password: string): Promise<boolean> {
  let tmpPath = path + ".tmp";

  return new Promise((res, rej) => {
    let salt = bcrypt.genSaltSync(16);
    let iv = crypto.randomBytes(16);

    let key = deriveKey(password, salt);

    let cipher = crypto.createCipheriv("aes-256-cbc", key, iv);
    let writer = fs.createWriteStream(tmpPath);

    writer.write(salt);
    writer.write(iv);

    fs.createReadStream(path).pipe(cipher).pipe(writer);

    writer.on("finish", async () => {
      await deleteFile(path);
      await renameFile(path + ".tmp", path);
      res(true);
      writer.close();
    });

    writer.on("error", rej);
  });
}

function decryptLogic(
  path: string,
  password: string,
  check: boolean = false
): Promise<boolean> {
  return new Promise((res, rej) => {
    let reader = fs.createReadStream(path);
    let salt: Buffer, iv: Buffer;

    let tmpPath = path + ".tmp";

    reader.on("readable", () => {
      if (!salt) {
        salt = reader.read(SALT_LENGTH);
      }

      if (!iv) {
        iv = reader.read(IV_LENGTH);
      }

      if (salt && iv) {
        reader.close();

        let key = deriveKey(password, salt.toString("ascii"));
        let decipher = crypto.createDecipheriv("aes-256-cbc", key, iv);

        decipher.on("error", rej).on("finish", () => res(true));

        reader = fs.createReadStream(path, {
          start: SALT_LENGTH + IV_LENGTH
        });

        let piped = reader.pipe(decipher).on("err", rej);

        if (!check) {
          let writer = fs.createWriteStream(tmpPath);
          piped.pipe(writer);

          writer.on("finish", async () => {
            await deleteFile(path);
            await renameFile(path + ".tmp", path);
            res(true);
            writer.close();
          });
        }
      }
    });
  });
}

async function decrypt(path: string, password: string, check: boolean = false) {
  let tmpPath = path + ".tmp";
  let res: boolean;

  try {
    res = await decryptLogic(path, password, check);
  } catch (err) {
    console.error("There was a problem decrypting", path, err);

    if (fs.existsSync(tmpPath)) {
      await deleteFile(tmpPath);
    }
    return false;
  }

  return res;
}
export { encrypt, decrypt, checkPassword };
