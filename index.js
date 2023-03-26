const { program } = require("commander");

const contacts = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      return console.table(contactList);
    case "get":
      const contact = await contacts.getContactById(id);
      return console.table(contact);
    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      return console.table(newContact);
    case "remove":
      const removedContact = await contacts.removeContact(id);
      return console.table(removedContact);
  }
};

program
  .option("-a, --action <type>")
  .option("-i, --id <type>")
  .option("-n, --name <type>")
  .option("-e, --email <type>")
  .option("-p, --phone <type>");
program.parse();

const argv = program.opts();
invokeAction(argv);
