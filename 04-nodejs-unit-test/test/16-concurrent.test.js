import { sayHelloAsync } from "../src/09-async.js";

test.concurrent("current 1", async () => {
  await expect(sayHelloAsync("Rifki")).resolves.toBe("Hello Rifki");
});

test.concurrent("current 2", async () => {
  await expect(sayHelloAsync("Rifki")).resolves.toBe("Hello Rifki");
});

test.concurrent("current 3", async () => {
  await expect(sayHelloAsync("Rifki")).resolves.toBe("Hello Rifki");
});
