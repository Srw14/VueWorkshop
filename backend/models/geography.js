const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const geographys = new mongoose.Schema({
  id: { type: Number },
  name: { type: String },
});

module.exports = mongoose.model("geographys", geographys);
