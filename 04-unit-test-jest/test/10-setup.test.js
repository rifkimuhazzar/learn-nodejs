import { sum } from "../src/sum";

// SETUP FUNCTION (JUGA DAPAT MENGGUNAKAN ASYNC)
beforeAll(() => {
  console.log("Before All");
});
afterAll(() => {
  console.log("After All");
});

beforeEach(() => {
  console.log("Before Each");
});
afterEach(() => {
  console.log("After Each");
});

// TEST FUNCTION
test("first test", () => {
  expect(sum(10, 10)).toBe(20);
  console.log("FIRST TEST");
});
test("second test", () => {
  expect(sum(10, 10)).toBe(20);
  console.log("SECOND TEST");
});
