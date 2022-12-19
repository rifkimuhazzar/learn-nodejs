// depedency management
// x | 1.x | 1.1.x | ~1.1.1 | ^1.1.1
// npm update / maka akan diupdate di package-lock.json nya baru kemudian npm install
import lod from "lodash";

const name = "rifki muhazzar";
const result = lod.capitalize(name);

console.info(result);
