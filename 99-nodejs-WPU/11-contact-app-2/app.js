const yargs = require("yargs");
const { saveContact } = require("./contacts.js");

yargs
  .command({
    command: "add",
    describe: "(add new contact)",
    builder: {
      name: {
        describe: "Name",
        demandOption: true,
        type: "string",
      },
      email: {
        describe: "Email",
        demandOption: true,
        type: "string",
      },
      phoneNumber: {
        describe: "Phone Number",
        demandOption: true,
        type: "string",
      },
    },
    handler(argv) {
      saveContact(argv.name, argv.email, argv.phoneNumber);
    },
  })
  .parse();
