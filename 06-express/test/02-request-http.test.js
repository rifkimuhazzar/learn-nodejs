import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send(`Hello ${req.query.name}! \nHello ${req.query.nickName}!`);
});

test("test query parameter", async () => {
  const response = await request(app)
    .get("/")
    .query({ name: "World", nickName: "Express" });

  expect(response.text).toBe("Hello World! \nHello Express!");
});
