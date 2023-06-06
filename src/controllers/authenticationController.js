const User = require("../models/User");
const AppError = require("../utils/AppError");
// bcrypt
const bcrypt = require("bcrypt");

// jwt
const jwt = require("jsonwebtoken");

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};

const getUserById = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id);
  if (!user) return next(new AppError("User not found!!", 404));
  res.send(user);
};

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const update = { email: req.body.email };
  const updatedUser = await User.findByIdAndUpdate(id, update, { new: true });
  if (!updatedUser) return next(new AppError("User not found!!", 404));
  res.send(updatedUser);
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  const deletedUser = await User.findByIdAndDelete(id);
  if (!deletedUser) return next(new AppError("User not found!!", 404));
  res.send(deletedUser);
};

const register = async (req, res, next) => {
  const { email, password } = req.body;
  const createdUser = await User.create({ email, password });
  res.send({ message: "user created successfully!", createdUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // getting the user by email
  // if not there (wrong email), then return invalid credentials
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Invalid credentials", 404));

  // now email is correct but we want to check if the password is correct
  // here we used a custom instance method, defined in the users model
  // if not return invalid credentials
  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next(new AppError("Invalid credentials", 404));

  // create token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // avoid returning password in the response
  user.password = undefined;

  // the response
  res.send({ message: "user logged in!", user, token });
};

module.exports = {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
};
