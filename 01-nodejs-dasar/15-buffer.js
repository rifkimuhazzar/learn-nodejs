const buffer = Buffer.from("Rifki Muhazzar");

console.info(buffer);
console.info(buffer.toString());

buffer.reverse();
console.info(buffer);
console.info(buffer.toString());

// buffer encoding
const buf = Buffer.from("V2ViIERldmVsb3Blcg==", "base64");

console.info(buf.toString()); // defaultnya adalah utf8
console.info(buf.toString("hex"));
