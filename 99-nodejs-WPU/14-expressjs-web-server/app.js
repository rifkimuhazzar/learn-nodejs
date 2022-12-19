// es6 module tidak support secara default __dirname dan __filename
// jadi harus di import terlebih dahulu
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  // res.send("Hello World");

  // res.json({
  //   name: "Rifki",
  //   email: "rifkiki78@gmail.com",
  // });

  res.sendFile("./index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  res.sendFile("./contact.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  res.sendFile("./about.html", { root: __dirname });
});
app.get("/product/:id", (req, res) => {
  res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`);
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("Not Found");
});

app.listen(port, () => {
  console.info(`listening at http://localhost:${port}`);
});
