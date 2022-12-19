const yargs = require("yargs");
const {
  saveContact,
  listContact,
  detailContact,
  deleteContact,
} = require("./contacts.js");

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
  .demandCommand();

yargs.command({
  command: "list",
  describe: "Show name & phone number",
  handler() {
    listContact();
  },
});

yargs.command({
  command: "detail",
  describe: "Show detail contact based on name",
  name: {
    describe: "Name",
    demandOption: true,
    type: "string",
  },
  handler(argv) {
    detailContact(argv.name);
  },
});

yargs.command({
  command: "delete",
  describe: "delete contact based on name",
  name: {
    describe: "Name",
    demandOption: true,
    type: "string",
  },
  handler(argv) {
    deleteContact(argv.name);
  },
});

yargs.parse();
