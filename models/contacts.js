// const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => { }
const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "./contacts.json");

const updateContacts = async (list) =>
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const oneContactById = contacts.find((el) => el.id === contactId);
  return oneContactById || null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((el) => el.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
}

async function updateContact(contactId, body) {
  const contacts = await listContacts();
  const contactById = contacts.find((el) => el.id === contactId);
  if (!contactById) {
    return null;
  }
  const newContact = {
    id: contactId,
    ...body,
  };
  const newContacts = contacts.map((el) => {
    if (el.id === contactId) {
      el = newContact;
    }
    return el;
  });
  await updateContacts(newContacts);
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
