import cluster from "cluster";
import os from "os";
import process from "process";
import http from "http";

if (cluster.isPrimary) {
  console.info(`primary: ${process.pid}`);

  // menambahkan worker
  // cluster.fork();
  // cluster.fork();
  for (let i = 0; i < os.cpus().length; i++) {
    cluster.fork();
  }

  cluster.addListener("exit", (worker) => {
    console.info(`Worker: ${worker.id} is exit`);
    cluster.fork();
  });
}

if (cluster.isWorker) {
  console.info(`worker: ${process.pid}`);

  const server = http.createServer((request, response) => {
    response.write(`Response from proccess: ${process.pid}`);
    response.end();
    process.exit();
  });

  server.listen(3000);
}
