import express from "express";
import request from "supertest";

const app = express();

// app.use(express.static(__dirname));
app.use("/public", express.static(__dirname + "/static/"));
app.use("/example", express.static(__dirname));

app.get("/", (req, res) => {
  res.send(`<b>THIS IS EXAMPLE OF '${req.path}' ROUTE</b>`);
});

app.get("/example", (req, res) => {
  res.send(`<b>THIS IS EXAMPLE OF '${req.path}' ROUTE</b>`);
});

app.get("/hello", (req, res) => {
  res.send(`<b>THIS IS EXAMPLE OF '${req.path}' ROUTE</b>`);
});

app.get("/hello/world", (req, res) => {
  res.send(`<b>THIS IS EXAMPLE OF '${req.path}' ROUTE</b>`);
});

// app.listen(3000, () => console.log("Server berjalan di port 3000"));

test("Test Static File Route Middleware", async () => {
  let response = await request(app).get("/public/21-my-contoh.txt");
  expect(response.status).toBe(200);
  expect(response.text).toBe("THIS IS '21-my-contoh.txt' FILE");

  response = await request(app).get("");
  expect(response.status).toBe(200);
  expect(response.text).toBe("<b>THIS IS EXAMPLE OF '/' ROUTE</b>");

  response = await request(app).get("/");
  expect(response.status).toBe(200);
  expect(response.text).toBe("<b>THIS IS EXAMPLE OF '/' ROUTE</b>");

  // ------------------------------------------------------------------------------------------------
  /* 
    jika "/example" maka akan tetap di-redirect ke "/example/" dan response akan berbeda
    kecuali jika menambahkan { redirect: false } sebagai parameter terakhir di expres.static()
  */
  response = await request(app).get("/example");
  expect(response.status).toBe(301);
  expect(response.text).toContain("Redirecting");

  response = await request(app).get("/example/");
  expect(response.status).toBe(200);
  expect(response.text).toContain(
    "<b>THIS IS EXAMPLE OF '/example/' ROUTE</b>"
  );

  // ------------------------------------------------------------------------------------------------
  response = await request(app).get("/hello");
  expect(response.status).toBe(200);
  expect(response.text).toContain("<b>THIS IS EXAMPLE OF '/hello' ROUTE</b>");

  response = await request(app).get("/hello/");
  expect(response.status).toBe(200);
  expect(response.text).toContain("<b>THIS IS EXAMPLE OF '/hello/' ROUTE</b>");
});
