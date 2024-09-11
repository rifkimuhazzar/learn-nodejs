import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res
    .set({
      "X-Powered-By": "Learn Express",
      "X-Author": "Hello World",
      example1: "Example Value",
      example2: 96,
    })
    .send("Hello Response");
});

test("Test Response Header", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");

  // atrribute case-insensitive tapi value case-sensitive
  expect(response.get("X-Powered-By")).toBe("Learn Express");
  expect(response.get("X-Author")).toBe("Hello World");
  expect(response.get("example1")).toBe("Example Value");
  expect(response.get("example2")).toBe("96");
});
