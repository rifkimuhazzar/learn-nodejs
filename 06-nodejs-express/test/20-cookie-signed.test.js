import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("secret-key")); // menggunakkan secret key untuk membuat signed cookie
app.use(express.json());

app.get("/", (req, res) => {
  const name = req.signedCookies["Login"];
  res.send(`Hello ${name}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;

  // signature cookie / tidak bisa diubah oleh client / memvalidasi cookie yang dikirim client
  res.cookie("Login", name, { path: "/", signed: true });

  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set(
      "Cookie",
      "Login=s%3ARifki.u8e4CCMgz%2Bl3%2BDGE6q6R4BouVRXsSVy%2FIAa6vhBUPAI; Path=/"
    );

  expect(response.text).toBe("Hello Rifki");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "Rifki" });

  console.info(response.get("Set-Cookie"));
  expect(response.get("Set-Cookie").toString()).toContain("Rifki");
  expect(response.text).toBe("Hello Rifki");
});
