test("not for strings", () => {
  const name = "Hello World";
  expect(name).not.toBe("Hello");
  expect(name).not.toEqual("Hello");
  expect(name).not.toMatch(/test/);
});

test("not for numbers", () => {
  const value = 2 + 2;
  expect(value).not.toBeGreaterThan(4);
  expect(value).not.toBeGreaterThanOrEqual(5);
  expect(value).not.toBeLessThan(4);
  expect(value).not.toBeLessThanOrEqual(3);

  expect(value).not.toBe(5);
  expect(value).not.toEqual(5);
});

test("not for arrays", () => {
  const names = [
    "Hello",
    "World",
    { firstName: "Hello" },
    { lastName: "World" },
  ];

  expect(names).not.toContain("WorldX");
  expect(names).not.toContainEqual("WorldX");

  expect(names).not.toContainEqual({ lastNameX: "World" });
  expect(names).not.toContainEqual({ lastName: "WorldX" });
});
