import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product: ${idProduct}`);
});

app.get("/categories/:id(\\d+)", (req, res) => {
  res.send(`Category: ${req.params.id}`);
});

// parameter lebih dari 1
app.get("/sellers/:idSeller(\\d+)/products/:idProduct", (req, res) => {
  res.send(
    `id seller: ${req.params.idSeller} - id product: ${req.params.idProduct}`
  );
});

test("Test Route Parameter", async () => {
  let response = await request(app).get("/products/laptop");
  expect(response.text).toBe("Product: laptop");

  response = await request(app).get("/products/benar");
  expect(response.text).toBe("Product: benar");

  response = await request(app).get("/categories/12345");
  expect(response.text).toBe("Category: 12345");

  response = await request(app).get("/categories/salah");
  expect(response.status).toBe(404);

  response = await request(app).get("/sellers/2751/products/laptop");
  expect(response.text).toBe("id seller: 2751 - id product: laptop");
});
