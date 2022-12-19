test("string .not", () => {
  const name = "Rifki Muhazzar";

  expect(name).not.toBe("Web Developer");
  expect(name).not.toEqual("Web Developer");
  expect(name).not.toMatch(/Dev/);
});

test("number .not", () => {
  const value = 2 + 3;

  expect(value).not.toBeGreaterThan(6);
  expect(value).not.toBeLessThan(3);
  expect(value).not.toBe(7);
});
