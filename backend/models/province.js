const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const provinces = new mongoose.Schema({
  id: { type: Number },
  name_th: { type: String },
  name_en: { type: String },
  geography_id: { type: Number },
  created_at: { type: Date },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

module.exports = mongoose.model("provinces", provinces);