import express from "express";
import request from "supertest";

const app = express();

app.use((req, res, next) => {
  console.info("Middleware 1");
  next();
});

app.get("/error-next", (req, res, next) => {
  const err = new Error("Error yang diteruskan dengan next()");
  next(err);
});

app.get("/error-throw", (req, res, next) => {
  throw new Error("Error yang di-throw");
});

app.get("/error-async", async (req, res, next) => {
  try {
    await Promise.reject(new Error("Async error")); // Simulasi operasi asynchronous yang gagal
  } catch (err) {
    next(err); // Perlu menggunakan next(err) untuk kesalahan asynchronous
  }
});

app.use((err, req, res, next) => {
  console.info(err.message);
  res.status(500).json({ status: "error", message: err.message });
});

// app.listen(3000, () => console.log("Server berjalan di port 3000"));

test("test error middleware from route '/error-next'", async () => {
  const response = await request(app).get("/error-next");
  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    status: "error",
    message: "Error yang diteruskan dengan next()",
  });
});

test("test error middleware from route '/error-next'", async () => {
  const response = await request(app).get("/error-throw");
  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    status: "error",
    message: "Error yang di-throw",
  });
});

test("test error middleware from route '/error-async'", async () => {
  const response = await request(app).get("/error-async");
  expect(response.status).toBe(500);
  expect(response.body).toEqual({
    status: "error",
    message: "Async error",
  });
});
