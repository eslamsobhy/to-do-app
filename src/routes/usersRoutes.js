const express = require("express");
const router = express.Router();

// login & signup validation middleware
const {
  loginValidation,
  signupValidation,
} = require("../utils/authenticationValidation");

// Users Logic
const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
} = require("../controllers/authenticationController");

// getting all the users
router.get("/", getAllUsers);

// get user by id
router.get("/:id", getUserById);

// create a new user (sign up)
router.post("/", signupValidation, register);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// login
router.post("/login", loginValidation, login);

module.exports = router;
