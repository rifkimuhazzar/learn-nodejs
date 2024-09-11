import express, { query } from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  if (req.query.name) {
    res.status(200); // status 200 akan digunakan secara default jika tidak ada res.status() yang ditulis
    res.send(`Hello ${req.query.name}`);
  } else {
    res.status(400).end();
  }
});

test("Test response status", async () => {
  let response = await request(app).get("/").query({ name: "Express" });
  expect(response.status).toBe(200);
  expect(response.text).toBe("Hello Express");

  response = await request(app).get("/");
  expect(response.status).toBe(400);
});
