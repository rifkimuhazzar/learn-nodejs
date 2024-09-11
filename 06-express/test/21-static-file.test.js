import express from "express";
import request from "supertest";

const app = express();

// app.use(express.static(__dirname + "/static"));
app.use("/static", express.static(__dirname + "/static"));

app.get("/", (req, res) => {
  res.send(`Hello Response`);
});

// tidak sampai disini karena sudah masuk ke express.static() jika diberi parameter pertama pada app.use()
app.get("/21-contoh.txt", (req, res) => {
  res.send("Hello Response");
});

test("Test Static File '/'", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("Hello Response");
});

test("Test Static File '/21-contoh.txt'", async () => {
  const response = await request(app).get("/21-contoh.txt");
  expect(response.text).toBe("Hello Response");
});

test("Test Static File '/static/21-contoh.txt", async () => {
  const response = await request(app).get("/static/21-contoh.txt");
  expect(response.text).toBe("This is sample text");
});
