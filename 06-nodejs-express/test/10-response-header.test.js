import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.set({
    "author-1": "rifki-1",
    "author-2": "rifki-2",
  });
  res.send("Hello Response");
});

test("Test Response", async () => {
  const response = await request(app).get("/");

  expect(response.get("author-1")).toBe("rifki-1");
  expect(response.get("author-2")).toBe("rifki-2");
  expect(response.text).toBe("Hello Response");
});
