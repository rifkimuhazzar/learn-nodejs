import express from "express";
import request from "supertest";

const app = express();

app.get("/", (request, response) => response.send("Hello World"));

// returnnya adalah promise
test("Test ExpressJS", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello World");
});
