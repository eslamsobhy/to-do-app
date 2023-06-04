const Joi = require("joi");
const AppError = require("./AppError");

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginValidation = (req, res, next) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return next(new AppError(error.message, 400));
  next();
};

module.exports = { loginValidation };
