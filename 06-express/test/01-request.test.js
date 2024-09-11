import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

test("test express with jest&supertest", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello World!");
});

// test api/route http menggunakan jest saja tanpa supertest (maka localhostnya wajib dijalankan)
// harus menjalankan file src/hello.js terlebih dahulu sebelum menjalankan test di bawah
test("test express with jest only", async () => {
  const response = await fetch("http://localhost:3000");
  const data = await response.text();
  expect(data).toBe("Hello World!");
});
