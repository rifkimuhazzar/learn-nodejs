import { sayHello } from "../src/18-sayHello.js";

test("sayHello success", () => {
  expect(sayHello("Rifki")).toBe("Hello Rifki");
});

test("sayHello error matchers", () => {
  expect(() => sayHello(null)).toThrow();
});

test.failing("sayHello error failing", () => {
  sayHello(null);
});
