// jika tanpa parameter kedua maka semuanya di-mock dan property __esModule-nya true
jest.mock("../src/database", () => {
  const originalModule = jest.requireActual("../src/database");
  return {
    __esModule: true, // property ini untuk ES6M export default agar dapat dibaca
    ...originalModule,
    default: jest.fn(() => "Ini default export"),
    getAllProducts: jest.fn(() => "Ini named export"),
  };
});

// import testDefault from "../src/database";
import { ProductService } from "../src/product-service";

test("mock modules testDefault() (default export)", () => {
  // kode di bawah akan menimpa parameter pada jest.fn()
  // testDefault.mockImplementation(() => {
  //   return "Hello";
  // });

  expect(ProductService.testDefaultExport()).toBe("Ini default export");
});

test.failing("mock modules getProductById()", () => {
  ProductService.findById(1); // for test.failing()
});

test("mock modules getAllProducts()", () => {
  expect(ProductService.findAll()).toBe("Ini named export");
});
