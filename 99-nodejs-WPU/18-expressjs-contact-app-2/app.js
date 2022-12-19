import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import express, { urlencoded } from "express";
import {
  loadContact,
  findContact,
  addContact,
  checkDuplicate,
} from "./utils/contacts.js";

import { body, validationResult, check } from "express-validator";
import session from "express-session";
import cookieParser from "cookie-parser";
import flash from "connect-flash";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

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
  res.render("contact", {
    title: "Contact Page",
    contacts,
    pesan: req.flash("pesan"),
  });
});

app.get("/contact/add", (req, res) => {
  res.render("add-contact", { title: "Add contact form" });
});

app.post(
  "/contact",
  [
    body("name").custom((value) => {
      const duplicate = checkDuplicate(value);
      if (duplicate) {
        throw new Error("Nama sudah digunakan");
      }
      return true;
    }),
    check("email", "Email tidak valid!").isEmail(),
    check("phone", "Nomor HP tidak valid!").isMobilePhone("id-ID"),
  ],

  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ error: errors.array() });

      res.render("add-contact", {
        title: "Form tambah data contact",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      req.flash("pesan", "Contact berhasil ditambahkan!");
      res.redirect("/contact");
    }
  }
);

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
