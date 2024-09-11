import express from "express";
import request from "supertest";

const app = express();

app.get("/hello/world", (req, res) => {
  res.json({
    path: req.path,
    oriUrl: req.originalUrl,
    hostname: req.hostname,
    protocol: req.protocol,
    secure: req.secure,
    subdomains: req.subdomains,
  });
});

test("test request url", async () => {
  const response = await request(app)
    .get("/hello/world")
    .query({ name: "World" });

  expect(response.body).toEqual({
    path: "/hello/world",
    oriUrl: "/hello/world?name=World",
    hostname: "127.0.0.1",
    protocol: "http",
    secure: false,
    subdomains: [],
  });
});
