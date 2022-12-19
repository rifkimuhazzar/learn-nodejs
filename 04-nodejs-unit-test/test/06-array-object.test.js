test("array", () => {
  const person1 = ["Rifki", "Muhazzar", "Web Developer"];

  expect(person1).toEqual(["Rifki", "Muhazzar", "Web Developer"]);
  expect(person1).toContain("Web Developer");
});

test("array object", () => {
  const person1 = [
    {
      name: "Rifki1",
    },
    {
      name: "Rifki2",
    },
  ];

  expect(person1).toContainEqual({
    name: "Rifki1",
  });
});

test("object", () => {
  const person1 = {
    name: "Rifki",
    role: "Web Developer",
  };

  expect(person1).toEqual({
    name: "Rifki",
    role: "Web Developer",
  });
});
