const express = require("express");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "..", "logs.log"),
  {
    flags: "a",
  }
);

const logger = app.use(morgan("combined", { stream: accessLogStream }));

module.exports = logger;
