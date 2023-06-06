const Todo = require("../models/Todo");
const AppError = require("../utils/AppError");

const getAllTodos = async (req, res, next) => {
  const todos = await Todo.find({ userId: req.user._id }).populate("userId");
  res.send({ todos });
};

const getTodoById = async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id).populate("userId");
  if (!todo) return next(new AppError("to-do not found!", 404));

  res.send(todo);
};

const createTodo = async (req, res, next) => {
  // title coming from the request
  const { title } = req.body;

  // to get the users ID, we need to know the id of the logged in user
  // we can do it by verifying the token sent from the client-side
  const loggedInUserId = req.user._id;

  // create the todo
  const createdTodo = await Todo.create({ title, userId: loggedInUserId });
  res.send({ message: "Todo created successfully!", createdTodo });
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
