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

const loadContact = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

const saveContact = (name, email, phoneNumber) => {
  const contact = { name, email, phoneNumber };
  const contacts = loadContact();

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

const listContact = () => {
  const contacts = loadContact();
  console.info("Contact list:");
  contacts.forEach((contact, i) => {
    console.info(`${i + 1}. ${contact.name} - ${contact.phoneNumber}`);
  });
};

const detailContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (!contact) {
    console.info(`${name} tidak ditemukan!`);
    return false;
  }

  console.info(contact.name);
  console.info(contact.phoneNumber);
  console.info(contact.email);
};

const deleteContact = (name) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  if (contacts.length === newContacts.length) {
    console.info(`${name} tidak ditemukan!`);
    return false;
  }

  fs.writeFileSync("./data/contacts.json", JSON.stringify(newContacts));
  console.info(`${name} deteled!`);
};

module.exports = { saveContact, listContact, detailContact, deleteContact };
