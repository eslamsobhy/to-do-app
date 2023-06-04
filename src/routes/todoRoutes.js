const express = require("express");

const router = express.Router();

// importing the CRUD logic
const {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

// getting all to-do's
router.get("/", getAllTodos);

// get to-do by id
router.get("/:id", getTodoById);

// create a new to-do
router.post("/", createTodo);

// update to-do
router.patch("/:id", updateTodo);

// delete to-do
router.delete("/:id", deleteTodo);

module.exports = router;
