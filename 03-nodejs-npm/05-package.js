// npm adduser | npm login
// npm publish / nama packagenya harus unik
// npm update | npm update namaPackage
import { sayHi, sum } from "learn-npm-library";
import { min, max } from "learn-npm-library/number";

console.info(sayHi("Rifki"));
console.info(sum([10, 10, 10, 10, 10]));

console.info(min(10, 20));
console.info(max(10, 20));
