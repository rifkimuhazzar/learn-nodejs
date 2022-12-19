// jika terjadi regeneratorRuntime is not defined maka tambah dev depedency babel berikut
// npm install @babel/plugin-transform-runtime --save-dev
// kemudian tambah config berikut pada babel.config.json

// "plugins": [
//   [
//     "@babel/plugin-transform-runtime",
//     {
//       "regenerator": true
//     }
//   ]
// ]

import { sayHelloAsync } from "../src/09-async";

test("test async function", async () => {
  const result = await sayHelloAsync("Rifki");
  expect(result).toBe("Hello Rifki");
});

test("test async matchers", async () => {
  await expect(sayHelloAsync("Rifki")).resolves.toBe("Hello Rifki");
  await expect(sayHelloAsync()).rejects.toBe("Name is empty");
});
