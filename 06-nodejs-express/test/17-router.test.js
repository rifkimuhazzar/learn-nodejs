import express from "express";
import request from "supertest";

const app = express();

const router = express.Router();
// middleware pada router | hanya berjalan pada router
router.use((res, req, next) => {
  console.info(`Recieve Request: ${req.originalUrl}`);
  next();
});
// routing pada router | hanya berjalan pada router
router.get("/feature/a", (req, res) => {
  res.send("feature a");
});

test("Test Route Disabled", async () => {
  let response = await request(app).get("/feature/a");
  expect(response.status).toBe(404);
});

test("Test Route Enabled", async () => {
  app.use(router); // routernya harus ditambahkan ke dalam object application/app dahulu

  let response = await request(app).get("/feature/a");
  expect(response.text).toBe("feature a");
});
