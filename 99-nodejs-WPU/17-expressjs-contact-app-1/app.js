import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express from "express";
import { loadContact, findContact } from "./utils/contacts.js";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

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
  res.render("about", { title: "About Page" });
});

app.get("/contact", (req, res) => {
  const contacts = loadContact();
  res.render("contact", { title: "Contact Page", contacts });
});

app.get("/contact/:name", (req, res) => {
  const contact = findContact(req.params.name);
  res.render("detail", { title: "Detail contact", contact });
});

app.use((req, res) => {
  res.status(404);
  res.send("Not Found");
});

app.listen(port, () => {
  console.info(`listening at http://localhost:${port}`);
});
