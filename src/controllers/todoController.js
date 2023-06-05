const Todo = require("../models/Todo");
const AppError = require("../utils/AppError");

const getAllTodos = (req, res, next) => {
  console.log(req.user);
  res.send("Hello");
};

const getTodoById = () => {
  // logic goes here
};

const createTodo = () => {
  // logic goes here
};

const updateTodo = () => {
  // logic goes here
};

const deleteTodo = () => {
  // logic goes here
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
