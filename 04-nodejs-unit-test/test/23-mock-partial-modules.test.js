import { getProductbyId, getAllProducts } from "../src/22-database.js";
import { ProductService } from "../src/22-product-service.js";

jest.mock("../src/22-database.js", () => {
  // mock sebagian saja
  const originalModule = jest.requireActual("../src/22-database.js");

  return {
    __esModule: true, // untuk mendukung javascript module | bisa juga tanpa menggunakan ini
    ...originalModule, // mengembalikan mock yang lain | bisa juga tanpa menggunakan ini
    getAllProducts: jest.fn(), // hanya mock pada function getAllProducts
  };
});

test.failing("mock modules getProductById", () => {
  ProductService.findById(1);
});

test("mock modules getAllProduct", () => {
  const products = [
    {
      id: 1,
      name: "Product Mock",
    },
    {
      id: 2,
      name: "Product Mock",
    },
  ];

  getAllProducts.mockImplementation(() => {
    return products;
  });

  expect(ProductService.findAll()).toEqual(products);
});
