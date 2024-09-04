test("truthiness matcher", () => {
  let value = null;
  expect(value).toBeNull();
  expect(value).toBeDefined();
  expect(value).toBeFalsy();

  value = undefined;
  expect(value).toBeUndefined();
  expect(value).toBeFalsy();

  value = "Hello World";
  expect(value).toBeTruthy();
  expect(value).toBeDefined();

  expect(value).toBe("Hello World"); // equal matchers
});
