import express from "express";
import request from "supertest";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser("Ini Contoh Secret Key Untuk signed cookie"));
app.use(express.json());

app.get("/", (req, res) => {
  const Login = req.signedCookies.Login;
  res.send(`Hello ${Login}`);
});

app.post("/login", (req, res) => {
  const name = req.body.name;
  res.cookie("Login", name, { path: "/", signed: true });
  res.send(`Hello ${name}`);
});

test("Test Cookie Read", async () => {
  const response = await request(app)
    .get("/")
    .set(
      "Cookie",
      "Login=s%3AWorld.6OyLP6UzN6qDXhHRHgxNMVJ%2Bq2B7idp3rwNHAvAZs0k"
    );
  expect(response.text).toBe("Hello World");
});

test("Test Cookie Write", async () => {
  const response = await request(app).post("/login").send({ name: "World" });
  console.log(response.get("Set-Cookie"));
  expect(response.get("Set-cookie")[0]).toContain("World");
  expect(response.text).toBe("Hello World");
});
