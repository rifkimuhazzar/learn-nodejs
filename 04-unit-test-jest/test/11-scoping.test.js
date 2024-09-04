beforeAll(() => console.log("Before All Outer"));
afterAll(() => console.log("After All Outer"));
beforeEach(() => console.log("Before Each Outer"));
afterEach(() => console.log("After Each Outer"));

test("TEST OUTER", () => console.log("TEST OUTER"));

describe("Inner Scoping/Grouping", () => {
  beforeAll(() => console.log("Before All Inner"));
  afterAll(() => console.log("After All Inner"));
  beforeEach(() => console.log("Before Each Inner"));
  afterEach(() => console.log("After Each Inner"));

  test("TEST INNER", () => console.log("TEST INNER"));

  // nested scoping
  describe("Inner Inner Scoping/Grouping", () => {
    beforeAll(() => console.log("Before All Inner Inner"));
    afterAll(() => console.log("After All Inner Inner"));
    beforeEach(() => console.log("Before Each Inner Inner"));
    afterEach(() => console.log("After Each Inner Inner"));

    test("TEST INNER INNER", () => console.log("TEST INNER INNER"));
  });
});

describe("Inner Scoping/Grouping 2", () => {
  test("TEST INNER 2", () => console.log("TEST INNER 2"));
});
