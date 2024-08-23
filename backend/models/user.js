const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const users = new mongoose.Schema({
  email: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  phonenumber: { type: String },
  password: { type: String },
  role: { type: String },
  address: { type: String },
  province: { type: String },
  amphure: { type: String },
  tambon: { type: String },
});

module.exports = mongoose.model("users", users);