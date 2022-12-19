import fs from "fs";
import zlib from "zlib";

const source = fs.readFileSync("21-zlib-compress.mjs");
const result = zlib.gzipSync(source);

fs.writeFileSync("21-zlib-compress.mjs.txt", result);
