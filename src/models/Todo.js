const mongoose = require("mongoose");

const { Schema } = mongoose;

const todoSchema = new Schema({
  title: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 25,
  },
  body: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 100,
  },
});

const Todo = mongoose.model("to-do", todoSchema);

module.exports = Todo;
