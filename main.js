const express = require("express");
const path = require("path");

const app = express();

// logging info about all of the requests
const morgan = require("morgan");
const fs = require("fs");

// Create a write stream (in append mode) to the log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs.log"), {
  flags: "a",
});

// Use the "morgan" middleware and specify the log format
app.use(morgan("combined", { stream: accessLogStream }));

app.use("home", (req, res, next) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(8000);
