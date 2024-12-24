// const fs = require("fs");
import fs from "fs";

const writeToFile = (file, content) => {
  fs.writeFileSync(file, content);
};

// module.exports = {
//   writeToFile,
// };

export { writeToFile };
