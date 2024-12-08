import { prismaClient } from "../src/application/database";
import bcrypt from "bcrypt";

async function removeTestUser() {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
}
async function createTestUser() {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("helloworld123", 10),
      name: "test",
      token: "test",
    },
  });
}
async function getTestUser() {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
}

async function removeAllTestContacts() {
  await prismaClient.contact.deleteMany({
    where: {
      username: "test",
    },
  });
}
async function createTestContact() {
  await prismaClient.contact.create({
    data: {
      first_name: "Hello",
      last_name: "World",
      email: "helloword@example.com",
      phone: "010101010101",
      username: "test",
    },
  });
}
async function createManyTestContacts() {
  for (let i = 0; i < 15; i++) {
    await prismaClient.contact.create({
      data: {
        first_name: `Hello ${i + 1}`,
        last_name: `World ${i + 1}`,
        email: `helloword${i + 1}@example.com `,
        phone: `010101010101 ${i + 1}`,
        username: `test`,
      },
    });
  }
}
async function getTestContact() {
  return prismaClient.contact.findFirst({
    where: {
      username: "test",
    },
  });
}

async function removeAllTestAddresses() {
  await prismaClient.address.deleteMany({
    where: {
      contact: {
        username: "test",
      },
    },
  });
}
async function createTestAddress() {
  const contact = await getTestContact();
  await prismaClient.address.create({
    data: {
      street: "Street Test",
      city: "City Test",
      province: "Province Test",
      country: "Country Test",
      postal_code: "01010101",
      contact_id: contact.id,
    },
  });
}
async function createManyTestAddresses() {
  const contact = await getTestContact();
  for (let i = 0; i < 15; i++) {
    await prismaClient.address.create({
      data: {
        street: `Street Test-${i + 1}`,
        city: `City Test-${i + 1}`,
        province: `Province Test-${i + 1}`,
        country: `Country Test-${i + 1}`,
        postal_code: `0000-${i + 1}`,
        contact_id: contact.id,
      },
    });
  }
}
async function getTestAddress() {
  const contact = await getTestContact();
  return prismaClient.address.findFirst({
    where: {
      contact_id: contact.id,
    },
  });
}

export {
  removeTestUser,
  createTestUser,
  getTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
  createManyTestContacts,
  removeAllTestAddresses,
  createTestAddress,
  getTestAddress,
  createManyTestAddresses,
};
