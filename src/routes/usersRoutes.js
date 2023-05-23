const express = require("express");

const router = express.Router();

// User Model
const User = require("../models/User");

// getting all the users
router.get("/", async (req, res, next) => {
  const users = await User.find();
  res.send(users);
});

// get user by id
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  res.send(user);
});

// create a new user
router.post("/", async (req, res, next) => {
  const { email, password } = req.body;
  const createdUser = await User.create({ email, password });
  createdUser.password = undefined;
  res.send({ message: "user created successfully!", createdUser });
});

// update user
router.patch("/:id", (req, res, next) => {
  res.send({ message: `user ${req.params.id} has been updated successfully!` });
});

// delete user
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  res.send(deletedUser);
});

module.exports = router;
