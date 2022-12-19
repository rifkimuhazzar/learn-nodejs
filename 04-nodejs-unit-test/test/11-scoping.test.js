beforeAll(() => console.info("Before All Outer"));
afterAll(() => console.info("After All Outer"));
beforeEach(() => console.info("Before Each Outer"));
afterEach(() => console.info("After Each Outer"));

test("test outer", () => console.info("Test Outer"));

// scoping / bisa digunakan lebih dari 1 / bisa juga melakukan nested scoping
describe("inner", () => {
  beforeAll(() => console.info("Before All Inner"));
  afterAll(() => console.info("After All Inner"));

  test("test inner", () => console.info("Test Inner"));
});
