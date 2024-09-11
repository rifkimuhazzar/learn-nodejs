import express from "express";
import request from "supertest";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route path atau url bersifat case-insensitive
app.post("/jsoN", (req, res) => {
  const name = req.body.name;
  res.json({ name: `Hello ${name}` }); // secara otomatis mengisi content-type yang sesuai
});

app.post("/form", (req, res) => {
  const body = req.body;
  res.json({ name: `Hello ${body.name}`, framework: body.framework });
});

test("Test Request JSON", async () => {
  const response = await request(app)
    // http header bersifat case insensitive
    .post("/jSon")
    // http header bersifat case insensitive, sebenarnya Content-Type dari client diisi otomatis oleh browser
    .set("ContEnt-TyPe", "aPPlication/jSon")
    .send({ name: "World" });
  expect(response.body).toEqual({ name: "Hello World" });

  // khusus saat mengecek value headernya ditest, kemungkinan untuk valuenya harus dicek dengan huruf kecil semua
  expect(response.get("coNtent-Type")).toBe("application/json; charset=utf-8");
});

test("Test Request Form", async () => {
  const response = await request(app)
    .post("/form")
    .set("Content-Type", "application/x-www-form-urlencoded")
    .send("name=World&framework=Express");
  expect(response.body).toEqual({ name: "Hello World", framework: "Express" });
});
