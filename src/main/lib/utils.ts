import { rename, unlink } from "fs";

function deleteFile(path: string) {
  return new Promise((res, rej) => {
    unlink(path, err => void (err ? rej(err) : res(true)));
  });
}

function renameFile(oldPath: string, newPath: string) {
  return new Promise((res, rej) => {
    rename(oldPath, newPath, err => void (err ? rej(err) : res(true)));
  });
}

export { deleteFile, renameFile };
