const fs = require("fs");
const validator = require("validator");

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

const saveContact = (name, email, phoneNumber) => {
  const contact = { name, email, phoneNumber };
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);

  const duplicate = contacts.find((contact) => contact.name === name);
  if (duplicate) {
    console.info("Contact sudah terdaftar, gunakan nama lain!");
    return false;
  }
  if (!validator.isEmail(email)) {
    console.info("Email tidak valid!");
    return false;
  }
  if (!validator.isMobilePhone(phoneNumber, "id-ID")) {
    console.info("Nomor HP tidak valid!");
    return false;
  }

  contacts.push(contact);
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));

  console.info("Data berhasil ditambahkan");
};

module.exports = { saveContact };
