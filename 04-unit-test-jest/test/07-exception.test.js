import { callMe, MyException } from "../src/exception";

test("exceptions matcher", () => {
  expect(() => callMe("Hello")).toThrow();
  expect(() => callMe("Hello")).toThrow(Error);
  expect(() => callMe("Hello")).toThrow(MyException);
  expect(() => callMe("Hello")).toThrow("Terjadi kesalahan");
});

test("exception not happened", () => {
  expect(callMe("World")).toBe("OK");
});
