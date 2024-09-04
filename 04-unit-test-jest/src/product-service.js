import testDefault, { getAllProducts, getProductById } from "./database";

export class ProductService {
  static findById(id) {
    return getProductById(id);
  }

  static findAll() {
    return getAllProducts();
  }

  static testDefaultExport() {
    return testDefault();
  }
}
