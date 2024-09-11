import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.firstName} ${req.query.lastName}!`);
});

test("test query parameter", async () => {
  const response = await request(app)
    .get("/")
    .query({ firstName: "World", lastName: "Express" });

  expect(response.text).toBe("Hello World Express!");
});
