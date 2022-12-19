import { getAllProducts, getProductbyId } from "../src/22-database.js";
import { ProductService } from "../src/22-product-service.js";

jest.mock("../src/22-database.js");

test("mock modules getProductById", () => {
  getProductbyId.mockImplementation((id) => {
    return {
      id: 1,
      name: "Product Mock",
    };
  });

  const product = ProductService.findById(1);

  expect(product).toEqual({
    id: 1,
    name: "Product Mock",
  });
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
