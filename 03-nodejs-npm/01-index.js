// jika ingin menggunakan import/javascript module tanpa extention .mjs, maka tambah type module pada package.json

// npm run-script namaScript / bisa run saja atau untuk script yang khusus bisa tanpa run-script
// untuk script khusus bisa menggunakan prefix pre dan post
import { writeToFile } from "./01-write.js";

writeToFile("01-hello.log", "Hello World");

console.info("Hello World");
