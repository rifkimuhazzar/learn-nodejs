import express from "express";
import request from "supertest";

const app = express();

// route path menggunakan regexp/pattern
app.get("/products/*.json", (req, res) => {
  res.send(req.originalUrl);
});
// bisa juga tanpa + seperti (\\d)
app.get("/categories/*(\\d+).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Test Route Path", async () => {
  let response = await request(app).get("/products/rifki.json");
  expect(response.text).toBe("/products/rifki.json");

  response = await request(app).get("/products/benar.json");
  expect(response.text).toBe("/products/benar.json");

  response = await request(app).get("/categories/12345.json");
  expect(response.text).toBe("/categories/12345.json");

  response = await request(app).get("/categories/salah.json");
  expect(response.status).toBe(404);
});
