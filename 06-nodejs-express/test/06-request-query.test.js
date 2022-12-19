import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.firstName} ${req.query.lastName}`);
});

test("Test query parameter", async () => {
  const response = await request(app)
    .get("/")
    .query({ firstName: "Rifki", lastName: "Muhazzar" });

  expect(response.text).toBe("Hello Rifki Muhazzar");
});
