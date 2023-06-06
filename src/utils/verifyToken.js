const jwt = require("jsonwebtoken");
const AppError = require("./AppError");
const User = require("../models/User");

const verifyToken = async (req, res, next) => {
  // get token
  const token = req.headers.authorization;
  if (!token) return next(new AppError("please provide a token!", 400));

  // verify token => get the payload
  const { id } = jwt.verify(token, process.env.JWT_SECRET);

  // get user with that specific id
  const user = await User.findOne({ _id: id });
  if (!user) return next(new AppError("Invalid token", 400));

  // attach the user to the request for the next step to deal with
  req.user = user;
  next();
};

module.exports = verifyToken;
