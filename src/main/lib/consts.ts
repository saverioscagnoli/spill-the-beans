import "dotenv/config";
import { app } from "electron";
import path from "path";

const SALT_ROUNDS = 14;
const PBKDF2_ITERATIONS = 100000;
const ENCRYPTION_ALGORITHM = process.env.ALGORITHM ?? "aes-256-gcm";
const SALT_LENGTH = 29;
const IV_LENGTH = 16;
const RESIZED_DIMS = [128, 128];

const CSV_DELIMITER = ",";
const SAFE_HEADERS = ["name", "password", "email", "icon"];

export {
  SALT_ROUNDS,
  PBKDF2_ITERATIONS,
  ENCRYPTION_ALGORITHM,
  SALT_LENGTH,
  IV_LENGTH,
  RESIZED_DIMS,
  CSV_DELIMITER,
  SAFE_HEADERS
};
