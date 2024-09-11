import express from "express";
import request from "supertest";

const app = express();

app.get("/products/*.json", (req, res) => {
  res.send(req.originalUrl);
});

app.get("/categories/*(\\d+).json", (req, res) => {
  res.send(req.originalUrl);
});

test("Test Route Path", async () => {
  let response = await request(app).get("/products/hello.json");
  expect(response.text).toBe("/products/hello.json");
  response = await request(app).get("/products/hello123.json");
  expect(response.text).toBe("/products/hello123.json");
  response = await request(app).get("/products/123.json");
  expect(response.text).toBe("/products/123.json");

  response = await request(app).get("/categories/123.json");
  expect(response.text).toBe("/categories/123.json");
  response = await request(app).get("/categories/hello123.json");
  expect(response.text).toBe("/categories/hello123.json");
  response = await request(app).get("/categories/hello.json");
  expect(response.status).toBe(404);
});
