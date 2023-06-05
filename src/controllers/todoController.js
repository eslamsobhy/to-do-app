const Todo = require("../models/Todo");
const AppError = require("../utils/AppError");

const getAllTodos = (req, res, next) => {
  console.log(req.user);
  res.send("Hello");
};

const getTodoById = () => {
  // logic goes here
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
