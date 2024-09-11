import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/express", (req, res) => {
  res.send("Hello Express!");
});

app.listen(3000, () => console.log("App started on port 3000"));
