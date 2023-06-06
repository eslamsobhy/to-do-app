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

const updateTodo = async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) return next(new AppError("todo not found!!", 400));

  const updatedData = {};
  updatedData.title = req.body.title ? req.body.title : todo.title;
  updatedData.status = req.body.status ? req.body.status : todo.status;

  const updatedTodo = await Todo.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  if (!updatedTodo) return next(new AppError("todo not found!!", 400));

  res.send({ message: "record updated successfully!", updatedTodo });
};

const deleteTodo = async (req, res, next) => {
  const { id } = req.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo) return next(new AppError("to-do not found!!", 400));

  res.send({ message: "record deleted successfully!", deletedTodo });
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo,
};
