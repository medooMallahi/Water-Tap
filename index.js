const express = require("express");
const app = express();

const mongoose = require("mongoose");

const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res, next) => {
  res.send("Hello World");
});

const mongoDbUrl =
  "mongodb+srv://medoo:0592413118@rlck.ifnzw.mongodb.net/Rlck?retryWrites=true&w=majority";

let PORT = process.env.PORT || 5400;

mongoose
  .connect(mongoDbUrl)
  .then(() => {
    console.log("connected ");
    app.listen(PORT);
  })
  .catch(() => {
    console.log("Error with connecting to DB");
  });
