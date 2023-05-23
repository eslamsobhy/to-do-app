const express = require("express");

const router = express.Router();

// User Model
const User = require("../models/User");

// getting all the users
router.get("/", (req, res, next) => {
  res.send({ message: "getting all users" });
});

// get user by id
router.get("/:id", (req, res, next) => {
  res.send({ message: `getting user by id: ${req.params.id}` });
});

// create a new user
router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const createdUser = await User.create({ email, password });
  res.send({ message: "user created successfully!", createdUser });
});

// update user
router.patch("/:id", (req, res, next) => {
  res.send({ message: `user ${req.params.id} has been updated successfully!` });
});

// delete user
router.delete("/:id", (req, res, next) => {
  res.send({ message: `user ${req.params.id} has been deleted successfully!` });
});

module.exports = router;
