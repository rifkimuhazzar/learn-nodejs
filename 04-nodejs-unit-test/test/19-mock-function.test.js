// mock digunakan ketika melakukan unit test  yang berhubungan dengan sistem lain
// mock object adalah object tiruan yang bisa dibuat untuk menyerupai object aslinya
// jest mendukung banyak jenis mock, diantaranya: mock function, class, module

import { calculate, calculateReturn } from "../src/01-sum.js";

test("Test calculate", () => {
  const callback = jest.fn();

  calculate([10, 10, 10], callback);
  calculate([10, 10, 10, 10, 10], callback);

  expect(callback.mock.calls.length).toBe(2); // expect nya di panggil 2x

  console.info(callback.mock.calls);

  expect(callback.mock.calls[0][0]).toBe(30);
  expect(callback.mock.calls[1][0]).toBe(50);
});

test("Test mock return value", () => {
  const callback = jest.fn();

  callback.mockReturnValueOnce(40);
  callback.mockReturnValueOnce(80);

  expect(calculateReturn([10, 10, 10], callback)).toBe(40);
  expect(calculateReturn([10, 10, 10], callback)).toBe(80);

  expect(callback.mock.results[0].value).toBe(40);
  expect(callback.mock.results[1].value).toBe(80);
});

test("Test mock return implementation", () => {
  const callback = jest.fn();
  callback.mockImplementation((total1) => {
    return total1 * 2;
  });

  expect(calculateReturn([10, 10, 10], callback)).toBe(60);
  expect(calculateReturn([10, 10, 10, 10], callback)).toBe(80);

  expect(callback.mock.results[0].value).toBe(60);
  expect(callback.mock.results[1].value).toBe(80);
});
