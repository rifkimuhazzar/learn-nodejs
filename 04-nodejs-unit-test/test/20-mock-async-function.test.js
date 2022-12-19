import { getBalance } from "../src/09-async.js";

test("mock async funtion", async () => {
  const from = jest.fn();
  from.mockResolvedValueOnce(1000);

  await expect(getBalance("Rifki", from)).resolves.toEqual({
    name: "Rifki",
    balance: 1000,
  });

  expect(from.mock.calls.length).toBe(1);

  await expect(from.mock.results[0].value).resolves.toBe(1000);
});

test.failing("mock async funtion rejected", async () => {
  const from = jest.fn();
  from.mockRejectedValueOnce(new Error("Ups"));

  await getBalance("Rifki", from);
});

test("mock async funtion error matchers", async () => {
  const from = jest.fn();
  from.mockRejectedValueOnce("Rejected");

  await expect(getBalance("Rifki", from)).rejects.toBe("Rejected");
});
