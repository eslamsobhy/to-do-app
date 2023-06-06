const express = require("express");

const router = express.Router();

// token verification middleware
const verifyToken = require("../utils/verifyToken");

// importing the CRUD logic
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// getting all to-do's
router.get("/", verifyToken, getAllTodos);

// get to-do by id
router.get("/:id", verifyToken, getTodoById);

// create a new to-do
router.post("/", verifyToken, createTodo);

// update to-do
router.patch("/:id", verifyToken, updateTodo);

// delete to-do
router.delete("/:id", deleteTodo);

module.exports = router;
