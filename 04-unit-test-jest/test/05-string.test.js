test("strings matchers", () => {
  const name = "Hello World";

  expect(name).toBe("Hello World");
  expect(name).toEqual("Hello World");
  expect(name).toMatch(/lo Wo/);
});
