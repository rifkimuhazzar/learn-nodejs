// const fs = require("fs"); // core modules

const fileName = require("./03-2-module"); //local modules
fileName.sayHi("Web Developer");
console.info(
  fileName.sayHello("Frontend"),
  fileName.person.person(),
  fileName.fullName,
  new fileName.MyClass()
);

// const moment = require("moment"); // third party/npm modules
