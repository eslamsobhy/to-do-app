const express = require("express");

const app = express();

// logs
const logger = require("./src/controllers/loggingController");
app.use(logger);

// getting all the users
app.get("/users", (req, res, next) => {
  res.send({ message: "getting all users" });
});

// get user by id
app.get("/users/:id", (req, res, next) => {
  res.send({ message: `getting user by id: ${req.params.id}` });
});

// create a new user
app.post("/users", (req, res, next) => {
  res.send({ message: "user created successfully!" });
});

// update user
app.patch("/users/:id", (req, res, next) => {
  res.send({ message: `user ${req.params.id} has been updated successfully!` });
});

// delete user
app.delete("/users/:id", (req, res, next) => {
  res.send({ message: `user ${req.params.id} has been deleted successfully!` });
});

app.use("/home", (req, res, next) => {
  res.send("<h1>Hello world!</h1>");
});

app.listen(8000);
