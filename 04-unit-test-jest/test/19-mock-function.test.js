import { calculate, calculateAndReturn } from "../src/sum";

test("test calculate with mock", () => {
  const callback = jest.fn();

  calculate([10, 10, 10], callback);
  calculate([10, 10, 10, 10, 10], callback);

  expect(callback.mock.calls.length).toBe(2);
  expect(callback.mock.calls[0][0]).toBe(30);
  expect(callback.mock.calls[1][0]).toBe(50);
  console.log(callback.mock);
});

// jika callback di calculate() dihapus, tidak terjadi error
test("test calculate without mock", () => {
  function logging(total) {
    console.log(total);
  }

  calculate([10, 10, 10], logging);
  calculate([10, 10, 10, 10, 10], logging);
});

test("test mock return value", () => {
  const callback = jest.fn();
  callback.mockReturnValueOnce(40);
  callback.mockReturnValueOnce(80);

  // hasil parameter pertama [10, 10, 10] disimpan di mockFn.mock.calls
  expect(calculateAndReturn([10, 10, 10], callback)).toBe(40);
  expect(calculateAndReturn([10, 10, 10], callback)).toBe(80);

  expect(callback.mock.results[0].value).toBe(40);
  expect(callback.mock.results[1].value).toBe(80);
  console.log(callback.mock);
});

test("test mock implementation", () => {
  const callback = jest.fn();
  callback.mockImplementation((total) => {
    return total * 2;
  });

  expect(calculateAndReturn([10, 10, 10], callback)).toBe(60);
  expect(calculateAndReturn([10, 10, 10, 10, 10], callback)).toBe(100);

  expect(callback.mock.results[0].value).toBe(60);
  expect(callback.mock.results[1].value).toBe(100);
  console.log(callback.mock);
});
