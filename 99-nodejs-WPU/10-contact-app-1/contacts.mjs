import fs from "fs";
import readLine from "readline";

const rl = readLine.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const writeQuestion = (wq) => {
  return new Promise((resolve, reject) => {
    rl.question(wq, (value) => {
      resolve(value);
    });
  });
};

const saveContact = (name, email, phoneNumber) => {
  const contact = { name, email, phoneNumber };
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  contacts.push(contact);
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));

  console.info("Data berhasil ditambahkan");
  rl.close();
};

export { writeQuestion, saveContact };
