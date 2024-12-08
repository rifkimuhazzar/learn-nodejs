import { web } from "../src/application/web.js";
import {
  createTestUser,
  removeTestUser,
  removeAllTestContacts,
  createTestContact,
  getTestContact,
  createManyTestContacts,
} from "./test-util";
import supertest from "supertest";

describe("POST /api/contact", () => {
  beforeEach(async () => {
    await createTestUser();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to create new contact", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "Hello",
        last_name: "World",
        email: "helloworld@example.com",
        phone: "010101010101",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.first_name).toBe("Hello");
    expect(result.body.data.last_name).toBe("World");
    expect(result.body.data.email).toBe("helloworld@example.com");
    expect(result.body.data.phone).toBe("010101010101");
  });

  it("should reject to create new contact if request is invalid", async () => {
    const result = await supertest(web)
      .post("/api/contacts")
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "World",
        email: "helloworld@example",
        phone: "010101010101",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to get contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe(testContact.first_name);
    expect(result.body.data.last_name).toBe(testContact.last_name);
    expect(result.body.data.email).toBe(testContact.email);
    expect(result.body.data.phone).toBe(testContact.phone);
  });

  it("should return 404 if contact id is not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
  });
});

describe("PUT /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to update existing contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        first_name: "Hello Updated",
        last_name: "World Updated",
        email: "hwupdated@example.com",
        phone: "020202020202",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBe(testContact.id);
    expect(result.body.data.first_name).toBe("Hello Updated");
    expect(result.body.data.last_name).toBe("World Updated");
    expect(result.body.data.email).toBe("hwupdated@example.com");
    expect(result.body.data.phone).toBe("020202020202");
  });

  it("should reject to update if request is invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test")
      .send({
        first_name: "",
        last_name: "World Updated",
        email: "hwupdated@example",
        phone: "",
      });

    expect(result.status).toBe(400);
  });

  it("should reject to update if contact is not found", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test")
      .send({
        first_name: "Hello Updated",
        last_name: "World Updated",
        email: "hwupdated@example.com",
        phone: "020202020202",
      });

    expect(result.status).toBe(404);
    console.log(result.status, result.body);
  });
});

describe("DELETE /api/contacts/:contactId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to delete contact", async () => {
    let testContact = await getTestContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testContact = await getTestContact();
    expect(testContact).toBe(null);
  });

  it("should reject to delete if contact doesn't exist", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts", () => {
  beforeEach(async () => {
    await createTestUser();
    await createManyTestContacts();
  });

  afterEach(async () => {
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to search without query param", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should be able to search to page 2", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ page: 2 })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(5);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.total_page).toBe(2);
    expect(result.body.paging.total_item).toBe(15);
  });

  it("should be able to search using email", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ email: "helloword1" })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });

  it("should be able to search using phone", async () => {
    const result = await supertest(web)
      .get("/api/contacts")
      .query({ phone: "010101010101 1" })
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(7);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.total_page).toBe(1);
    expect(result.body.paging.total_item).toBe(7);
  });
});
