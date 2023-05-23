const express = require("express");

const app = express();

/*
  IMPORTING
*/
// db
require("./db");

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

// Public Error Handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send({
    status: statusCode,
    message: err?.message || "Internal Server Error!",
    errors: err?.errors || [],
  });
});
app.listen(8000);
