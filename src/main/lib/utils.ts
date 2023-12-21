import fs from "fs";
import crypto from "crypto";
import { PBKDF2_ITERATIONS } from "./consts";

async function readFile(path: string): Promise<Buffer> {
  return new Promise((res, rej) => {
    fs.readFile(path, (err, data) => {
      if (err) rej(err);
      else res(data);
    });
  });
}

async function writeFile(path: string, data: Buffer): Promise<void> {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, err => {
      if (err) rej(err);
      else res();
    });
  });
}

async function deleteFile(path: string): Promise<void> {
  return new Promise((res, rej) => {
    fs.unlink(path, err => {
      if (err) rej(err);
      else res();
    });
  });
}

async function readDir(path: string): Promise<string[]> {
  return new Promise((res, rej) => {
    fs.readdir(path, (err, files) => {
      if (err) rej(err);
      else res(files);
    });
  });
}

async function copyFile(file: string, dest: string) {
  return new Promise((res, rej) => {
    fs.copyFile(file, dest, err => {
      if (err) rej(err);
      else res(true);
    });
  });
}

async function renameFile(oldPath: string, newPath: string) {
  return new Promise((res, rej) => {
    fs.rename(oldPath, newPath, err => {
      if (err) rej(err);
      else res(true);
    });
  });
}

async function deriveKey(password: string, salt: string): Promise<Buffer> {
  return new Promise((res, rej) => {
    crypto.pbkdf2(password, salt, PBKDF2_ITERATIONS, 16, "sha512", (err, derivedKey) => {
      if (err) rej(err);
      else res(derivedKey);
    });
  });
}

export { readFile, writeFile, deleteFile, readDir, copyFile, renameFile, deriveKey };
