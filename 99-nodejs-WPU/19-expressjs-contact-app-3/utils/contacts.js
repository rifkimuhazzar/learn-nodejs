import fs from "fs";

const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
}

export const loadContact = () => {
  const file = fs.readFileSync("./data/contacts.json", "utf-8");
  const contacts = JSON.parse(file);
  return contacts;
};

export const findContact = (name) => {
  const contacts = loadContact();
  const contact = contacts.find((contact) => {
    return contact.name.toLowerCase() === name.toLowerCase();
  });
  return contact;
};

const saveContacts = (contacts) => {
  fs.writeFileSync("./data/contacts.json", JSON.stringify(contacts));
};

export const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

export const checkDuplicate = (name) => {
  const contacts = loadContact();
  return contacts.find((contact) => {
    return contact.name === name;
  });
};

export const deleteContact = (name) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter((contact) => contact.name !== name);

  saveContacts(filteredContacts);
};

export const updateContacts = (newContact) => {
  const contacts = loadContact();
  const filteredContacts = contacts.filter(
    (contact) => contact.name !== newContact.oldName
  );

  // console.info(filteredContacts, newContact);

  delete newContact.oldName;
  filteredContacts.push(newContact);
  saveContacts(filteredContacts);
};
