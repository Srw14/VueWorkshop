const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const carts = new mongoose.Schema({

});
module.exports = mongoose.model("carts",carts);