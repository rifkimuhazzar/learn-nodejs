import { sum } from "../src/01-sum.js";

// dijalankan diawal dan diakhir saja saat semua test dijalankan
// jika kode async bisa tambahkan async sebelum functionya
beforeAll(() => {
  console.info("Before All");
});
afterAll(() => {
  console.info("After All");
});

// dijalankan setiap sebelum dan sesudah suatu test dijalankan
// jika kode async bisa tambahkan async sebelum functionya
beforeEach(() => {
  console.info("Before Each");
});
afterEach(() => {
  console.info("After Each");
});

test("first test", () => {
  expect(sum(10, 10)).toBe(20);
  console.info("First Test");
});

test("second test", () => {
  expect(sum(10, 10)).toBe(20);
  console.info("Second Test");
});
