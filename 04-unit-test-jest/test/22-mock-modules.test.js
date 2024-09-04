import { getProductById, getAllProducts } from "../src/database";
import { ProductService } from "../src/product-service";

jest.mock("../src/database.js"); // dapat dipanggil sebelum import di atas

test("mock modules getProductById()", () => {
  getProductById.mockImplementation((id) => {
    return {
      id: id,
      name: "Product Mock",
    };
  });

  const product = ProductService.findById(1);

  expect(product).toEqual({ id: 1, name: "Product Mock" });
});

// jest.unmock("../src/database.js"); // melpas mock, test di atas juga akan gagal

test("mock modules getAllProducts()", () => {
  const products = [
    {
      id: 1,
      name: "Product Mock 1",
    },
    {
      id: 2,
      name: "Product Mock 2",
    },
  ];

  getAllProducts.mockImplementation(() => {
    return products;
  });

  expect(ProductService.findAll()).toEqual(products);
});
