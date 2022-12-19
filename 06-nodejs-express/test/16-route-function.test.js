import express from "express";
import request from "supertest";

const app = express();

// route function untuk melakukan method lebih dari 1 untuk 1 route
app
  .route("/products")
  .get((req, res) => {
    res.send("Get product");
  })
  .post((req, res) => {
    res.send("Create product");
  })
  .put((req, res) => {
    res.send("Update product");
  });

test("Test Route Function", async () => {
  let response = await request(app).get("/products");
  expect(response.text).toBe("Get product");

  response = await request(app).post("/products");
  expect(response.text).toBe("Create product");

  response = await request(app).put("/products");
  expect(response.text).toBe("Update product");
});
