const SAFE_HEADERS = ["index", "name", "password", "email", "notes", "icon"] as const;
const SALT_ROUNDS = 14;
const PBKDF2_ITERATIONS = 100000;
const ENCRYPTION_ALGORITHM = process.env.ALGORITHM ?? "aes-256-gcm";
const SALT_LENGTH = 29;
const IV_LENGTH = 16;
const RESIZED_DIMS = [128, 128];

export {
  SAFE_HEADERS,
  SALT_ROUNDS,
  PBKDF2_ITERATIONS,
  ENCRYPTION_ALGORITHM,
  SALT_LENGTH,
  IV_LENGTH,
  RESIZED_DIMS
};
