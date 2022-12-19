import { Console } from "console";
import fs from "fs";

const file = fs.createWriteStream("22-console.log");

const log = new Console({
  stdout: file,
  stderr: file,
});

log.info("Hello World");
log.error("Hello World");

const person = {
  firstName: "Rifki",
  lastName: "Muhazzar",
};

log.table(person);
