import { getProductbyId, getAllProducts } from "./22-database.js";

export class ProductService {
  static findById(id) {
    return getProductbyId(id);
  }

  static findAll() {
    return getAllProducts();
  }
}
