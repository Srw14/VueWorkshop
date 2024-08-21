const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const users = new mongoose.Schema({
  email: { type: String },
  firstname: { type: String }, 
  lastname: { type: String },
  password: { type: String },
  role: { type: String },
});

module.exports = mongoose.model("users", users);
