const fs = require("fs");
const { faker } = require("@faker-js/faker");

const firstName = faker.person.firstName();
const lastName = faker.person.lastName();
const email = faker.internet.email({ firstName, lastName }).toLowerCase();
const password = faker.internet.password({ length: 10, memorable: true }) + "@123";

const envData = `
USER_FIRSTNAME=${firstName}
USER_LASTNAME=${lastName}
USER_EMAIL=${email}
USER_PASSWORD=${password}
`;

fs.writeFileSync(".env", envData.trim());
console.log(".env updated with new random user");
