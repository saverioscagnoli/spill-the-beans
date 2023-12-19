import fs from "fs";

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

export { readFile, writeFile, deleteFile, readDir };
