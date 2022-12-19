// jika menggunakan javascript module/extention .mjs, maka secara default sudah merupakan async function, jadi bisa menggunakan await.

function samplePromise() {
  return Promise.resolve("Rifki");
}

const name = await samplePromise();
console.info(name);
