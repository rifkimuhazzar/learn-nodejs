import http from "http";

const server = http.createServer((request, response) => {
  console.info(request.method);
  console.info(request.url);
  // console.table(request.headers);

  if (request.method === "POST") {
    request.addListener("data", (data) => {
      response.setHeader("content-type", "application/json");
      response.write(data);
      response.end();
    });
  } else {
    if (request.url === "/nodejs") {
      response.write("NodeJS");
    } else {
      response.write("Hello World");
    }

    response.end();
  }
});

server.listen(3000);
