const express = require("express");

const router = express.Router();

// User Model
const User = require("../models/User");

// getting all the users
router.get("/", async (req, res, next) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    console.log("ERROR: ", err);
    next(err);
  }
});

// get user by id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
  } catch (err) {
    console.log("ERROR: ", err);
    next(err);
  }
});

// create a new user
router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const createdUser = await User.create({ email, password });
    createdUser.password = undefined;
    res.send({ message: "user created successfully!", createdUser });
  } catch (err) {
    console.log("ERROR: ", err);
    next(err);
  }
});

// update user
router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const update = { email: req.body.email };
    const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
    res.send(updatedUser);
  } catch (err) {
    console.log("ERROR: ", err);
    next(err);
  }
});

// delete user
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    res.send(deletedUser);
  } catch (err) {
    console.log("ERROR: ", err);
    next(err);
  }
});

module.exports = router;
