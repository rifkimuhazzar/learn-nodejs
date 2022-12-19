import { sumAll } from "../src/01-sum.js";

const numbers = [
  [[10, 10, 10], 30],
  [[10, 10, 10, 10, 10], 50],
  [[10, 10, 10, 10, 10, 50], 100],
];

test.each(numbers)("test sumAll(%s) should result %d", (received, expected) => {
  expect(sumAll(received)).toBe(expected);
});
