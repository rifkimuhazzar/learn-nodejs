import zlib from "zlib";
import fs from "fs";

const source = fs.readFileSync("21-zlib-compress.mjs.txt");
console.info(source.toString());

const result = zlib.unzipSync(source);
console.info(result.toString());
