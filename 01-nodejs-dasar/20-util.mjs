import util from "util";

const firstName = "Rifki";
const lastName = "Muhazzar";

console.info(`Hi ${firstName} ${lastName}`);
console.info(util.format("Hi %s %s", firstName, lastName));

const person = {
  firstName: "Rifki",
  lastName: "Muhazzar",
};

console.info(person);
console.info(`Person : ${JSON.stringify(person)}`);
console.info(util.format("Person : %j", person));
