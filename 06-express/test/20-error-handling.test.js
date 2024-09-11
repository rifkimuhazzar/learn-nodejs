import express from "express";
import request from "supertest";

const app = express();

function errorMiddleware(err, req, res, next) {
  res.status(500).send(`Terjadi Error: ${err.message}`);
}

app.get("/", (req, res) => {
  throw new Error("UPS!");
});

app.use(errorMiddleware);

test("Test Error Middleware", async () => {
  const response = await request(app).get("/");
  expect(response.status).toBe(500);
  expect(response.text).toBe("Terjadi Error: UPS!");
});
