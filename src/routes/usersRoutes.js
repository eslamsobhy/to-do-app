const express = require("express");

const router = express.Router();

// getting all the users
router.get("/", (req, res, next) => {
  res.send({ message: "getting all users" });
});

// get user by id
router.get("/:id", (req, res, next) => {
  res.send({ message: `getting user by id: ${req.params.id}` });
});

// create a new user
router.post("/", (req, res, next) => {
  const body = req.body;
  console.log(body);
  res.send({ message: "user created successfully!" });
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
