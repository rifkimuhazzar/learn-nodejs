import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser()); // untuk memparse cookie yang dikirim browser, cookie terletak di header
app.use(express.json());

app.get("/", (req, res) => {
  const { name, framework } = req.cookies;
  res.send(`Hello ${name} using ${framework}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/" });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set("Cookie", "name=World;framework=Express");
  expect(response.text).toBe("Hello World using Express");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "World" });
  expect(response.get("Set-Cookie")[0]).toBe("Login=World; Path=/");
  expect(response.text).toBe("Hello World");
});
