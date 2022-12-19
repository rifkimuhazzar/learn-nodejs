import express from "express";
import request from "supertest";

const app = express();

// callback parameter pertama request diisi otomatis oleh expressjs
// object request berisi informasi http request seperti query param, header, body, dll
app.get("/", (request, response) => {
  response.send(`Hello ${request.query.name}`);
});

// returnnya adalah promise
test("Test query parameter", async () => {
  const response = await request(app).get("/").query({ name: "Rifki" });
  expect(response.text).toBe("Hello Rifki");
});
