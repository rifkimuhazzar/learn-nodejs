import { writeQuestion, saveContact } from "./contacts.mjs";

const questions = async () => {
  const name = await writeQuestion("Enter your name: ");
  const email = await writeQuestion("Enter your email: ");
  const phoneNumber = await writeQuestion("Enter your phone number: ");

  saveContact(name, email, phoneNumber);
};
questions();
