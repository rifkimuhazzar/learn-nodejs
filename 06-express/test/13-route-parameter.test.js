import express from "express";
import request from "supertest";

const app = express();

app.get("/products/:id", (req, res) => {
  const idProduct = req.params.id;
  res.send(`Product: ${idProduct}`);
});

app.get("/categories/:id(\\d+)", (req, res) => {
  const idCategory = req.params.id;
  res.send(`Category: ${idCategory}`);
});

app.get("/seller/:idSeller(\\d+)/product/:idProduct", (req, res) => {
  const idSeller = req.params.idSeller;
  const idProduct = req.params.idProduct;
  res.send(`Seller: ${idSeller} & Product: ${idProduct}`);
});

test("Test Route Parameter products & categories", async () => {
  let response = await request(app).get("/products/hello");
  expect(response.text).toBe("Product: hello");
  response = await request(app).get("/products/hello123");
  expect(response.text).toBe("Product: hello123");
  response = await request(app).get("/products/123");
  expect(response.text).toBe("Product: 123");

  response = await request(app).get("/categories/123");
  expect(response.text).toBe("Category: 123");
  response = await request(app).get("/categories/hello123");
  expect(response.status).toBe(404);
  response = await request(app).get("/categories/hello");
  expect(response.status).toBe(404);
});

test("Test Route Parameter seller", async () => {
  let response = await request(app).get("/seller/123/product/abcdefg");
  expect(response.text).toBe("Seller: 123 & Product: abcdefg");
});
