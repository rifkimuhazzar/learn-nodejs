export function sum(first, second) {
  return first + second;
}

export function sumAll(numbers) {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  return total;
}

export function calculate(numbers, callback) {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  callback(total);
}

export function calculateAndReturn(numbers, callback) {
  let total = 0;
  for (const number of numbers) {
    total += number;
  }
  return callback(total);
}
