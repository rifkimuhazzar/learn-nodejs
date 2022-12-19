import { callMe, MyException } from "../src/07-exception.js";

test("exception", () => {
  expect(() => callMe("Err")).toThrow();
  expect(() => callMe("Err")).toThrow(MyException);
  expect(() => callMe("Err")).toThrow("Ups my exception happens");
});

test("exception not happens", () => {
  expect(callMe("Frontend")).toBe("OK");
});
