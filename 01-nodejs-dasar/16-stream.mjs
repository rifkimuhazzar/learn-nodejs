import fs from "fs";

const writer = fs.createWriteStream("16-target.txt");

writer.write("Rifki\n");
writer.write("Muhazzar\n");
writer.write("Web Developer");
writer.end();

const reader = fs.createReadStream("16-target.txt");
reader.addListener("data", (data) => {
  console.info(data.toString());
});
