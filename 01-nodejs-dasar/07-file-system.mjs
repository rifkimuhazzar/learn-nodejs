// gunakan slash promises jika ingin menggunakan promise
// jika tidak maka gunakan callback/sync
// jika promise bisa menggunakan await ataupun tidak menggunakan
import fs from "node:fs/promises";

const buffer = await fs.readFile("07-file-system.mjs");

console.info(buffer.toString());

await fs.writeFile("07.test.txt", "Hello World");
