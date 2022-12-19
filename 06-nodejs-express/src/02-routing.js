import express from "express";

const app = express();

app.listen(3000, () => console.info("Server started at port 3000"));

app.get("/", (request, response) => response.send("Hello World"));
app.get("/rifki", (request, response) => response.send("Hello Rifki"));
