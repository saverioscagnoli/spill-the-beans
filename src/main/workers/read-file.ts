import { workerData, parentPort } from "worker_threads";
import fsp from "fs/promises";

async function main() {
  let { path } = workerData as { path: string };
  let rawData = await fsp.readFile(path);
  parentPort?.postMessage(rawData);
}

main();
