import express from "express";
import request from "supertest";
import expressFileUpload from "express-fileupload";

const app = express();
app.use(expressFileUpload());

app.post("/file", async (req, res) => {
  const textFile = req.files.article;
  await textFile.mv(__dirname + "/upload/" + textFile.name);

  res.send(`Hello ${req.body.name}, you just uploaded ${textFile.name}`);
});

test("Test Request File Upload", async () => {
  const response = await request(app)
    .post("/file")
    .set("content-type", "multipart/form-data")
    .field("name", "World")
    .attach("article", __dirname + "/23-contoh.txt");

  expect(response.text).toBe("Hello World, you just uploaded 23-contoh.txt");
});
