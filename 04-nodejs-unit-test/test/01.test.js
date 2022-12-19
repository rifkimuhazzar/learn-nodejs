// npx jest | npm test yang sudah disetting pada package.json | bisa menambahkan nama file

// jest belum mendukung javascript module
// gunakan library babel untuk membantu jest mengenali fitur javascript module

// ada 2 cara untuk melakukan konfigurasi jest
// dari file dengan perintah npx jest --init | langsung dari package.json

// npx jest --help / untuk melihat semua perintah jest

import { sum, sumAll } from "../src/01-sum.js";

test("function 1 sum test", () => {
  const result = sum(1, 2);

  expect(result).toBe(3);
});

test("function 2 sum test", () => {
  const result = sum(1, 2);

  expect(result).toBe(3);
});

test("function 3 sum test", () => {
  const result = sum(1, 2);

  expect(result).toBe(3);
});

test("sumAll function", () => {
  const numbers = [1, 1, 1, 1, 1];

  expect(sumAll(numbers)).toBe(5);
});
