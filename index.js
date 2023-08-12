const { Command } = require("commander");
const program = new Command();

const contactsModule = require("./contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contactsModule.listContacts();
      console.log("Lista kontaktów:", contactsList);
      break;

    case "get":
      if (!id) {
        console.error("ID is required for get action.");
        return;
      }
      const contactById = await contactsModule.getContactById(id);
      console.log("Kontakt o ID", id + ":", contactById);
      break;

    case "add":
      if (!name || !email || !phone) {
        console.error("Name, email, and phone are required for add action.");
        return;
      }
      const newContact = await contactsModule.addContact(name, email, phone);
      console.log("Nowy kontakt:", newContact);
      break;

    case "remove":
      if (!id) {
        console.error("ID is required for remove action.");
        return;
      }
      const removedContact = await contactsModule.removeContact(id);
      console.log("Usunięto kontakt o ID", id + ":", removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
