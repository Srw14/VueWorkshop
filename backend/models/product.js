const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const products = new mongoose.Schema({
  mainimg: { type: String },
  img: [{ type: String }],
  productname: { type: String },
  userid: { type: String },
  price: { type: String },
  amonut: { type: String },
  detail: { type: String },
});

module.exports = mongoose.model("products", products);