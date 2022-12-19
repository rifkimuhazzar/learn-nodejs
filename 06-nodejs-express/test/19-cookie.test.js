import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser()); // middleware cookie parser
app.use(express.json()); // middleware parsing

// secara default express tidak mendukung cookie
// gunakan third party middleware Cookie Parser untuk mendukung fitur cookie
// ini bisa menyimpan data ke cookie / mengambil data ke cookie

// membaca cookie
app.get("/", (req, res) => {
  const name = req.cookies["name"];
  res.send(`Hello ${name}`);
});

// menulis cookie
app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set("Cookie", "name=Rifki;author=rifki muhazzar");

  expect(response.text).toBe("Hello Rifki");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Rifki" });

  expect(response.get("Set-Cookie").toString()).toBe("Login=Rifki; Path=/");
  expect(response.text).toBe("Hello Rifki");
});
