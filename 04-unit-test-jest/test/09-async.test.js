import { sayHelloAsync } from "../src/async";

test("test async", async () => {
  const result = await sayHelloAsync("World");
  expect(result).toBe("Hello World");
});

// akan menunggu test di atas selesai terlebih dahulu.
test("strings matcher", () => {
  const result = "Hello World";
  expect(result).toBe("Hello World");
});

test("async matcher", async () => {
  await expect(sayHelloAsync("World")).resolves.toBe("Hello World");
  await expect(sayHelloAsync("World")).resolves.not.toBe("Hello");

  await expect(sayHelloAsync()).rejects.toBe("Name is empty");
  await expect(sayHelloAsync()).rejects.not.toBe("Hello");
});
