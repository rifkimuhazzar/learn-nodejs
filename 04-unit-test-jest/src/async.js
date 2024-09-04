export async function sayHelloAsync(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (name) {
        resolve(`Hello ${name}`);
      } else {
        reject(`Name is empty`);
      }
    }, 1000);
  });
}

export async function getBalance(name, from) {
  const balance = await from();
  return { name, balance };
}
