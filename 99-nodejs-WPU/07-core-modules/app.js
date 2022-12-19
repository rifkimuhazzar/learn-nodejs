const fs = require("fs");

// console.log(fs);

// sync
// fs.writeFileSync("data/test.txt", "Hello World");
// try {
//   fs.writeFileSync("data/test.txt", "Hello World");
// } catch (error) {
//   console.info(error);
// }

// async
// fs.writeFile("data/test.txt", "Hello World Asynchronous", (e) => {
//   console.info(e);
// });

// readFile
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.info(data);

// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.info(data);
// });

// readLine
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const rl = readline.createInterface({ input, output });

rl.question("What is your name? ", (name) => {
  rl.question("What is your email? ", (email) => {
    const contact = { name, email };
    const file = fs.readFileSync("data/contacts.json", "utf-8");
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    // console.info(`Nama anda ${name}, Email anda ${email}`);
    console.info("Data berhasil ditambahkan");
    rl.close();
  });
});
