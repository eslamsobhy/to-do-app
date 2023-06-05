const User = require("../models/User");
const AppError = require("../utils/AppError");
// bcrypt
const bcrypt = require("bcrypt");

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
  if (!email || !password)
    return next(new AppError("email & password are required!", 404));
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("Invalid credentials", 404));
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(new AppError("Invalid credentials", 404));
  user.password = undefined;
  res.send(user);
};

module.exports = {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  deleteUser,
  login,
};
