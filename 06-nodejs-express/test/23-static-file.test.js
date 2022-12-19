import express from "express";
import request from "supertest";

const app = express();
// app.use(express.static(__dirname + "/static")); // cara 1
app.use("/second", express.static(__dirname + "/static")); // cara 2, menambahkan prefix

app.get("/", (req, res) => {
  res.send("Hello Response");
});

// routing akan di timpa oleh middlewarenya jika menggunakan cara ke 1
// gunakan cara ke 2 agar tidak di timpa
app.get("/23-sample.txt", (req, res) => {
  res.send("Hello Response");
});

test("Test Static File", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
});

test("Test Static File 23-sample.txt", async () => {
  const response = await request(app).get("/23-sample.txt");
  expect(response.text).toBe("Hello Response");
});

test("Test Static File /static/sample.txt", async () => {
  const response = await request(app).get("/second/23-sample.txt");
  expect(response.text).toBe("This is sample text");
});
