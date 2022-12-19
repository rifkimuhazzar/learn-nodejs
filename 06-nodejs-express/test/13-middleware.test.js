import express from "express";
import request from "supertest";

// middleware akan di panggil oleh router manapun dan dieksekusi sebelum router dieksekusi
// bisa mengubah req dan res object sebelum router dieksekusi
// bisa mmengakhiri res tanpa harus mengeksekusi router

// middleware 1
const logger = (req, res, next) => {
  console.info(`Recieve request: ${req.method} ${req.originalUrl}`);
  next(); // harus menggunakan next, ini untuk melajutkan ke middleware selanjutnya jika ada, jika tidak ada maka akan dilanjutkan ke router / jika tidak next() maka akan diakhiri reqnya
};
const addPoweredHeader = (req, res, next) => {
  res.set("x-powered-by", "expressjs");
  next();
};
// middleware untuk menolak jika reqnya tidak valid
const apiKeyMiddleware = (req, res, next) => {
  if (req.query.apiKey) {
    next();
  } else {
    res.status(401).end();
    // res.status(401).send("Unauthorized");
  }
};
// middleware untuk memanipulasi object req, karena req juga javascript object
const requestTimeMiddleware = (req, res, next) => {
  req.requestTime = Date.now(); // menambahkan req
  next();
};

const app = express();
// menambahkan middleware ke dalam app
app.use(logger);
app.use(apiKeyMiddleware);
app.use(addPoweredHeader);
app.use(requestTimeMiddleware);

app.get("/", (req, res) => {
  res.send("Hello Response");
});
app.get("/rifki", (req, res) => {
  res.send("Hello Rifki");
});
app.get("/time", (req, res) => {
  res.send(`Hello, today is ${req.requestTime}`);
});

test("Test Response Middleware 1", async () => {
  const response = await request(app).get("/").query({ apiKey: "123" });

  expect(response.get("x-powered-by")).toBe("expressjs");
  expect(response.text).toBe("Hello Response");
});
test("Test Response Middleware 2", async () => {
  const response = await request(app).get("/rifki").query({ apiKey: "123" });

  expect(response.get("x-powered-by")).toBe("expressjs");
  expect(response.text).toBe("Hello Rifki");
});
test("Test Response Middleware Unauthorized", async () => {
  const response = await request(app).get("/rifki");

  expect(response.status).toBe(401);
});
test("Test Response Middleware Time", async () => {
  const response = await request(app).get("/time").query({ apiKey: "123" });

  expect(response.get("x-powered-by")).toBe("expressjs");
  expect(response.text).toContain("Hello, today is");
});
