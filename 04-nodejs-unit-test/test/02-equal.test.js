test("test toBe", () => {
  const name = "Rifki";
  const hello = `Hello ${name}`;

  expect(hello).toBe("Hello Rifki");
});

test("test toEqual", () => {
  let person = { firstName: "Rifki" };
  Object.assign(person, { lastName: "Muhazzar", role: "Web Developer" });

  expect(person).toEqual({
    firstName: "Rifki",
    lastName: "Muhazzar",
    role: "Web Developer",
  });
});
