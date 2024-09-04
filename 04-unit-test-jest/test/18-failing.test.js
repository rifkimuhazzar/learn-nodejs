import { sayHello } from "../src/sayHello";

test("sayHello success", () => {
  expect(sayHello("World")).toBe("Hello World");
});

test.failing("sayHello error 1 (failing)", () => {
  sayHello();
});

test("sayHello error 2 (matcher)", () => {
  expect(() => sayHello()).toThrow();
});
