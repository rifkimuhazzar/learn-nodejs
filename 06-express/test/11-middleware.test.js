import express from "express";
import request from "supertest";

function logger(req, res, next) {
  console.info(`Receive request: ${req.method} ${req.originalUrl}`);
  next();
}

function addPoweredHeader(req, res, next) {
  res.set("X-Powered-By", "Hello World");
  next();
}

function apiKeyMiddleware(req, res, next) {
  req.query.apiKey ? next() : res.status(401).end();
}

function requestTimeMiddleware(req, res, next) {
  req.requestTime = Date.now();
  next();
}

const app = express();
app.use(logger);
app.use(addPoweredHeader);
app.use(apiKeyMiddleware);
app.use(requestTimeMiddleware);

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

app.get("/express", (req, res) => {
  res.send(`Hello Express`);
});

app.get("/time", (req, res) => {
  res.send(`Hello, today is ${req.requestTime}`);
});

test("Test Resposne Middleware '/'", async () => {
  const response = await request(app).get("/").query({ apiKey: "123" });
  expect(response.get("X-Powered-By")).toBe("Hello World");
  expect(response.text).toBe("Hello Response");
});

test("Test Resposne Middleware '/express'", async () => {
  const response = await request(app).get("/express").query({ apiKey: "123" });
  expect(response.get("X-Powered-By")).toBe("Hello World");
  expect(response.text).toBe("Hello Express");
});

test("Test Resposne Middleware Unauthorized '/express'", async () => {
  const response = await request(app).get("/express");
  expect(response.status).toBe(401);
});

test("Test Resposne Middleware Time '/time'", async () => {
  const response = await request(app).get("/time").query({ apiKey: "123" });
  expect(response.get("X-Powered-By")).toBe("Hello World");
  expect(response.text).toContain("Hello, today is");
});
