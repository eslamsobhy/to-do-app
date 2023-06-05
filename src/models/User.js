const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// Middlewares
userSchema.pre("save", async function () {
  // hashing the password before saving to the database
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
});

userSchema.post("save", async function () {
  // after saving the hashed password to the database
  // avoid returning it in the response
  this.password = undefined;
});

// create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
