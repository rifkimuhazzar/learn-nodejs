test("string", () => {
  const name = "Rifki Muhazzar";

  expect(name).toBe("Rifki Muhazzar");
  expect(name).toEqual("Rifki Muhazzar");
  expect(name).toMatch(/zzar/);
});
