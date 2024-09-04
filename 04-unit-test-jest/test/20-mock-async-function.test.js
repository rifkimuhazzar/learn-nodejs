import { getBalance } from "../src/async";

test("mock async function", async () => {
  const from = jest.fn();
  from.mockResolvedValueOnce(1000); // ini shorthand mockImplementationOnce(value)
  // from.mockImplementationOnce(() => Promise.resolve(1000));

  // "await" dapat di dalam expect(), jika di dalam maka tidak perlu resolves/rejects lagi
  await expect(getBalance("Hello", from)).resolves.toEqual({
    name: "Hello",
    balance: 1000,
  });
  await expect(from.mock.results[0].value).resolves.toBe(1000);
  expect(from.mock.calls.length).toBe(1);

  console.log("TEST 1:", from.mock);
  console.log("TEST 1 results.value:", await from.mock.results[0].value);
});

test.failing("mock async function failing", async () => {
  const from = jest.fn();
  from.mockRejectedValueOnce("A");
  await getBalance("Hello", from);
});

test("mock async function exceptions matcher", async () => {
  const from = jest.fn();
  from.mockRejectedValueOnce(new Error("Terjadi Kesalahan"));
  from.mockRejectedValueOnce(new Error("Terjadi Kesalahan"));
  from.mockRejectedValueOnce(new Error("Terjadi Kesalahan"));
  from.mockRejectedValueOnce("Rejected");

  await expect(getBalance("Hello", from)).rejects.toThrow();
  await expect(getBalance("Hello", from)).rejects.toThrow(Error);
  await expect(getBalance("Hello", from)).rejects.toThrow("Terjadi Kesalahan");
  await expect(getBalance("Hello", from)).rejects.toBe("Rejected");

  console.log("TEST 3:", from.mock);
});
