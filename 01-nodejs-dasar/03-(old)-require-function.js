// bisa menggunakan extention .js jika load module menggunakan require()
// tidak bisa menggunakan .mjs dan ini adalah versi lama
const os = require("os");

console.info(os.platform());
console.table(os.cpus());
