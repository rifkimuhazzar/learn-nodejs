import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const person = [
    {
      name: "Rifki 1",
      email: "rifki1@gmail.com",
    },
    {
      name: "Rifki 2",
      email: "rifki2@gmail.com",
    },
    {
      name: "Rifki 3",
      email: "rifki3@gmail.com",
    },
  ];

  res.render("index", {
    name: "Express",
    title: "Home Page",
    person,
  });
});
app.get("/about", (req, res) => {
  res.render("about", {title: "About Page"});
});
app.get("/contact", (req, res) => {
  res.render("contact", {title: "Contact Page"});
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
