import express from "express";
import request from "supertest";

const app = express();
const router = express.Router();

router.use((req, res, next) => {
  console.info(`Recieve request: ${req.originalUrl}`);
  next();
});

router.get("/feature/a", (req, res) => {
  res.send("feature a");
});

test("Test Route Disabled", async () => {
  const response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
});

test("Test Route Enabled", async () => {
  app.use(router);
  const response = await request(app).get("/feature/a");
  expect(response.status).toBe(200);
  expect(response.text).toBe("feature a");
});
