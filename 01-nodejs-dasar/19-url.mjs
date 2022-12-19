import { URL } from "url";

const url = new URL("https://nodejs.org/dist/latest-v18.x/docs/api/url.html");

console.info(url.toString());
console.info(url.href);
console.info(url.protocol);
console.info(url.host);
console.info(url.pathname);
console.info(url.searchParams);

url.host = "www.nodejs.org";
url.searchParams.append("learn", "url");
url.searchParams.append("learn2", "url2");
console.info(url.toString());
