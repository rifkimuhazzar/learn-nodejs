import readline from "readline";
import process from "process";

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

input.question("What is your name? ", (name) => {
  console.info(`Hi ${name}`);
  input.close();
});
