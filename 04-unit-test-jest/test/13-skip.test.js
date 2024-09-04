it("test 1", () => console.log("test 1"));
it("test 2", () => console.log("test 2"));
it.skip("test 3", () => {
  console.log("test 3");
  expect(5 + 5).toBe(5);
});
it("test 4", () => console.log("test 4"));
it("test 5", () => {
  console.log("test 5");
  expect(5 + 5).toBe(10);
});
