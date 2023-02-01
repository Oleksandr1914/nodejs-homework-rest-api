## GoIT Node.js Course Template Homework

Виконайте форк цього репозиторію для виконання домашніх завдань (2-6)
Форк створить репозиторій на вашому http://github.com

Додайте ментора до колаборації

Для кожної домашньої роботи створюйте свою гілку.

- hw02
- hw03
- hw04
- hw05
- hw06

Кожна нова гілка для др повинна робитися з master

Після того, як ви закінчили виконувати домашнє завдання у своїй гілці, необхідно зробити пулл-реквест (PR). Потім додати ментора для рев'ю коду. Тільки після того, як ментор заапрувить PR, ви можете виконати мердж гілки з домашнім завданням у майстер.

Уважно читайте коментарі ментора. Виправте зауваження та зробіть коміт у гілці з домашнім завданням. Зміни підтягнуться у PR автоматично після того, як ви відправите коміт з виправленнями на github
Після виправлення знову додайте ментора на рев'ю коду.

- При здачі домашньої роботи є посилання на PR
- JS-код чистий та зрозумілий, для форматування використовується Prettier

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

// const fs = require("fs/promises");
// const path = require("path");
// const { nanoid } = require("nanoid");

// const contactsPath = path.join(\_\_dirname, "./contacts.json");

// const updateContacts = async (list) =>
// await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));

// async function listContacts() {
// const data = await fs.readFile(contactsPath);
// return JSON.parse(data);
// }

// async function getContactById(contactId) {
// const contacts = await listContacts();
// const oneContactById = contacts.find((el) => el.id === contactId);
// return oneContactById || null;
// }

// async function addContact(name, email, phone) {
// const contacts = await listContacts();
// const newContact = {
// id: nanoid(),
// name,
// email,
// phone,
// };
// contacts.push(newContact);
// await updateContacts(contacts);
// return newContact;
// }

// async function removeContact(contactId) {
// const contacts = await listContacts();
// const index = contacts.findIndex((el) => el.id === contactId);
// if (index === -1) {
// return null;
// }
// const [result] = contacts.splice(index, 1);
// await updateContacts(contacts);
// return result;
// }

// async function updateContact(contactId, body) {
// const contacts = await listContacts();
// const contactById = contacts.find((el) => el.id === contactId);
// if (!contactById) {
// return null;
// }
// const newContact = {
// id: contactId,
// ...body,
// };
// const newContacts = contacts.map((el) => {
// if (el.id === contactId) {
// el = newContact;
// }
// return el;
// });
// await updateContacts(newContacts);
// return newContact;
// }

// module.exports = {
// listContacts,
// getContactById,
// removeContact,
// addContact,
// updateContact,
// };
