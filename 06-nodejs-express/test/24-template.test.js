import express from "express";
import request from "supertest";
import mustacheExpress from "mustache-express";

const app = express();

// express tidak memiliki fitur template engine
// maka harus menggunakan library, disini menggunakan mustache-express

app.set("views", __dirname + "/views");
app.set("view engine", "html");
app.engine("html", mustacheExpress());

app.get("/", (req, res) => {
  res.render("24-index", {
    title: "Hello World",
    say: "This is a test",
  });
});

test("Test Template Engine", async () => {
  const response = await request(app).get("/");

  expect(response.text).toContain("Hello World");
  expect(response.text).toContain("This is a test");

  console.info(response.text);
});
