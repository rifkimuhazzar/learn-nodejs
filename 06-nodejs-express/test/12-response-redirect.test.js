import express from "express";
import request from "supertest";

const app = express();

app.get("/", (req, res) => {
  res.redirect("/next-page");
  // res.redirect(301, "/next-page");
  // res.redirect("https://expressjs.com/");
});

test("Test Response Redirect", async () => {
  const response = await request(app).get("/");

  expect(response.status).toBe(302); // status default
  expect(response.get("location")).toBe("/next-page");
});
