const express = require("express");

const app = express();

// logs
const logger = require("./src/controllers/loggingController");
app.use(logger);

app.use("/home", (req, res, next) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(8000);
