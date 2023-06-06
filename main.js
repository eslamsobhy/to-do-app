const express = require("express");

const app = express();

/*
  IMPORTING
*/
// error handler
const errorHandler = require("express-async-error").Handler;

// env varaibles
require("dotenv").config();

// CORS
const cors = require("cors");

// db
require("./db");

// parsing incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS
app.use(cors());

// logs
const logger = require("./src/controllers/loggingController");

// routers
const usersRouter = require("./src/routes/usersRoutes");
const todoRoutes = require("./src/routes/todoRoutes");

// ======================================================================

/*
  USING
*/
// error handler
app.use(errorHandler());

// logs
// app.use(logger);

// routers
app.use("/users", usersRouter);
app.use("/todos", todoRoutes);

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

app.listen(process.env.PORT);
