test("arrays matchers", () => {
  const names = [
    "Hello",
    "World",
    { firstName: "Hello" },
    { lastName: "World" },
  ];

  expect(names).toContain("World"); // like toBe but for array
  expect(names).toContainEqual("World"); // deep equality like toEqual but for array
  expect(names).toContainEqual({ lastName: "World" }); // deep equality like toEqual but for array
});
