import {
  createTestAddress,
  createTestContact,
  createTestUser,
  getTestAddress,
  getTestContact,
  removeAllTestAddresses,
  removeAllTestContacts,
  removeTestUser,
  createManyTestAddresses,
} from "./test-util.js";
import supertest from "supertest";
import { web } from "../src/application/web.js";

describe("POST /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to create address", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Street Test");
    expect(result.body.data.city).toBe("City Test");
    expect(result.body.data.province).toBe("Province Test");
    expect(result.body.data.country).toBe("Country Test");
    expect(result.body.data.postal_code).toBe("01010101");
  });

  it("should be able to create address with 'country' and 'postal_code' only", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        country: "Country Test",
        postal_code: "01010101",
      });

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBeNull();
    expect(result.body.data.city).toBeNull();
    expect(result.body.data.province).toBeNull();
    expect(result.body.data.country).toBe("Country Test");
    expect(result.body.data.postal_code).toBe("01010101");
  });

  it("should reject to create address if request is invalid", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "",
        postal_code: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject to create address if contact doesn't exist", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .post(`/api/contacts/${testContact.id + 1}/addresses`)
      .set("Authorization", "test")
      .send({
        street: "Street Test",
        city: "City Test",
        province: "Province Test",
        country: "Country Test",
        postal_code: "01010101",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("GET /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to get address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();

    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.street).toBe("Street Test");
    expect(result.body.data.city).toBe("City Test");
    expect(result.body.data.province).toBe("Province Test");
    expect(result.body.data.country).toBe("Country Test");
    expect(result.body.data.postal_code).toBe("01010101");
  });

  it("should reject to get address if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject to get address if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe("PUT /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to update address", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "Updated Street",
        city: "Updated City",
        province: "Updated Province",
        country: "Updated Country",
        postal_code: "00001111",
      });

    expect(result.status).toEqual(200);
    expect(result.body.data.id).toBe(testAddress.id);
    expect(result.body.data.street).toBe("Updated Street");
    expect(result.body.data.city).toBe("Updated City");
    expect(result.body.data.province).toBe("Updated Province");
    expect(result.body.data.country).toBe("Updated Country");
    expect(result.body.data.postal_code).toBe("00001111");
  });

  it("should be able to update address only with 'country' and 'postal_code' fields", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        country: "Updated Country",
        postal_code: "00001111",
      });

    expect(result.status).toEqual(200);
    expect(result.body.data.street).toEqual("Street Test");
    expect(result.body.data.city).toEqual("City Test");
    expect(result.body.data.province).toEqual("Province Test");
    expect(result.body.data.country).toEqual("Updated Country");
    expect(result.body.data.postal_code).toEqual("00001111");
  });

  it("should reject to update address if request is invalid", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        street: "Updated Street",
        city: "Updated City",
        province: "Updated Province",
        country: "",
        postal_code: "",
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it("should reject to update address if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("Authorization", "test")
      .send({
        country: "Updated Country",
        postal_code: "00001111",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("Contact is not found");
  });

  it("should reject to update address if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .put(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("Authorization", "test")
      .send({
        country: "Updated Country",
        postal_code: "00001111",
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("Address is not found");
  });
});

describe("DELETE /api/contacts/:contactId/addresses/:addressId", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createTestAddress();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to delete a address", async () => {
    const testContact = await getTestContact();
    let testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id}`)
      .set("authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data).toBe("OK");

    testAddress = await getTestAddress();
    expect(testAddress).toBeNull();
  });

  it("should reject to delete a address if contact is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id + 1}/addresses/${testAddress.id}`)
      .set("authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("Contact is not found");
  });

  it("should reject to delete a address if address is not found", async () => {
    const testContact = await getTestContact();
    const testAddress = await getTestAddress();
    const result = await supertest(web)
      .delete(`/api/contacts/${testContact.id}/addresses/${testAddress.id + 1}`)
      .set("authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("Address is not found");
  });
});

describe("GET /api/contacts/:contactId/addresses", () => {
  beforeEach(async () => {
    await createTestUser();
    await createTestContact();
    await createManyTestAddresses();
  });

  afterEach(async () => {
    await removeAllTestAddresses();
    await removeAllTestContacts();
    await removeTestUser();
  });

  it("should be able to get all addresses for a contact", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id}/addresses`)
      .set("Authorization", "test");

    expect(result.status).toBe(200);
    expect(result.body.data.length).toBe(15);
  });

  it("should reject to get all addresses for a contact that doesn't exist", async () => {
    const testContact = await getTestContact();
    const result = await supertest(web)
      .get(`/api/contacts/${testContact.id + 1}/addresses`)
      .set("Authorization", "test");

    expect(result.status).toBe(404);
    expect(result.body.errors).toBe("Contact is not found");
  });
});
