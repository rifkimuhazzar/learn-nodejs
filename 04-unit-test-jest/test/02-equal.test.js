test("test .toBe()", () => {
  const name = "World";
  const hello = `Hello ${name}`;

  expect(hello).toBe("Hello World"); // Object.is equality
  expect(hello).toEqual("Hello World"); // deep equality
});

test("test .toEqual()", () => {
  const person = { id: "hello", firstName: "Hello", lastName: "World" };

  // deep equality
  expect(person).toEqual({
    id: "hello",
    firstName: "Hello",
    lastName: "World",
  });
});
