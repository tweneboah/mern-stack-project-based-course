const mongoose = require("mongoose");

//! Schema
const userSchema = new mongoose.Schema(
  {
    username: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

//model
const User = mongoose.model("User", userSchema);
module.exports = User;
