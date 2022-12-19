import express from "express";

// membuat object application
const app = express();

// menjalankan app
app.listen(3000, () => console.info("Server started at port 3000"));
