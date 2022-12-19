import { sumAll } from "../src/01-sum.js";

const numbers = [
  {
    numbers: [10, 10, 10],
    expected: 30,
  },
  {
    numbers: [10, 10, 10, 10, 10],
    expected: 50,
  },
  {
    numbers: [10, 10, 10, 10, 10, 10, 10],
    expected: 70,
  },
];

test.each(numbers)(
  "test sumAll($numbers) should result $expected",
  ({ numbers, expected }) => {
    expect(sumAll(numbers)).toBe(expected);
  }
);
