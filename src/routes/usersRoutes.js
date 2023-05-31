const express = require("express");

const router = express.Router();

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
router.post("/", register);

// update user
router.patch("/:id", updateUser);

// delete user
router.delete("/:id", deleteUser);

// login
router.post("/login", login);

module.exports = router;
