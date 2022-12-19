import dns from "dns/promises";

const address = await dns.lookup("nodejs.org");

console.info(address);
console.info(address.address);
console.info(address.family);
