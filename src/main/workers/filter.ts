import { parentPort, workerData } from "worker_threads";

function filter() {
  let { searchTerm, icons } = workerData as { searchTerm: string; icons: string[] };

  console.log(searchTerm);

  parentPort?.postMessage(icons.filter(name => name.toLowerCase().includes(searchTerm)));
}

filter();
