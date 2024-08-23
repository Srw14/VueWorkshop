const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const products = new mongoose.Schema({
  mainimg: { type: String },
  img: [{ type: String }],
  productname: { type: String },
  userid: { type: String },
  price: { type: Number },
  amount: { type: Number },
  category: { type: String },
  color: [{ type: String }],
  size: [{ type: String }],
  brand: { type: String },
  ships: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("products", products);