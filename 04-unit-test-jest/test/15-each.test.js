import { sumAll } from "../src/sum";

// EXAMPLE FROM "https://jestjs.io/docs/api#testeachtablename-fn-timeout"
// example test.each() for array
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])("ARRAY: .add(%i, %i) = %i", (a, b, expected) => {
  expect(a + b).toBe(expected);
});
// example test.each() for object
test.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])("OBJECT: .add($a, $b) = $expected", ({ a, b, expected }) => {
  expect(a + b).toBe(expected);
});

// EXAMPLE FROM PZN
// array
const table1 = [
  [[], 0],
  [[10], 10],
  [[10, 10, 10], 30],
  [[10, 10, 10, 10, 10], 50],
  [[10, 10, 10, 10, 10, 10, 10], 70],
];
test.each(table1)("test sumAll(%s) should get %i", (numbers, expected) => {
  expect(sumAll(numbers)).toBe(expected);
});
// object
const table2 = [
  { numbers: [], expected: 0 },
  { numbers: [10], expected: 10 },
  { numbers: [10, 10, 10], expected: 30 },
  { numbers: [10, 10, 10, 10, 10], expected: 50 },
  { numbers: [10, 10, 10, 10, 10, 10, 10], expected: 70 },
];
test.each(table2)(
  "test sumAll($numbers) should get $expected",
  ({ numbers, expected }) => {
    expect(sumAll(numbers)).toBe(expected);
  }
);
