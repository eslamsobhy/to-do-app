const express = require("express");

const router = express.Router();

// Custom error
const AppError = require("../utils/AppError");

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
  if (!user) return next(new AppError("User not found!!", 404));
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
router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const update = { email: req.body.email };
  const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
  if (!updatedUser) return next(new AppError("User not found!!", 404));
  res.send(updatedUser);
});

// delete user
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return next(new AppError("User not found!!", 404));
  res.send(deletedUser);
});

module.exports = router;
