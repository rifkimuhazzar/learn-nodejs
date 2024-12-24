export function sayHello(name) {
  return `Hello ${name}`;
}

export function sum(...values) {
  let total = 0;
  for (const value of values) {
    total += value;
  }
  return total;
}
