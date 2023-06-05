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
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
  }
});

/*
  - the previous middleware will be executed when creating a new user or when updating the user,
  - we just want it to be executed when the password is changed:
    - either when creating a new user
    - or when updating the user itself
    - so we added that condition.
*/

userSchema.post("save", async function () {
  // after saving the hashed password to the database
  // avoid returning it in the response
  this.password = undefined;
});

// Instance methods:
userSchema.methods.comparePassword = async function (password) {
  const isMatched = await bcrypt.compare(password, this.password);
  return isMatched;
};

// create the model
const User = mongoose.model("User", userSchema);

module.exports = User;
