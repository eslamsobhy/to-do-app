const express = require("express");

const app = express();

/*
  IMPORTING
*/
// logs
const logger = require("./src/controllers/loggingController");

// routers
const usersRouter = require("./src/routes/usersRoutes");

// ======================================================================

/*
  USING
*/
// logs
app.use(logger);

// routers
app.use("/users", usersRouter);

app.use("/home", (req, res, next) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(8000);
