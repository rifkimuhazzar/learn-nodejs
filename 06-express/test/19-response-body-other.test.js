import express from "express";
import request from "supertest";
import path from "node:path";

const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/19-contoh.txt");

  console.log("__dirname:\n", __dirname);
  console.log("__filename:\n", __filename);
  console.log(
    "path.join():\n",
    path.join(__dirname, "../src/19-contoh-in-src.txt")
  );
  console.log(
    "path.resolve():\n",
    path.resolve(__dirname, "../src/19-contoh-in-src.txt")
  );
});

test("Test Response Send File", async () => {
  const response = await request(app).get("/");
  expect(response.text).toBe("This is sample text");
});
