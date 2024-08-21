const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const tambons = new mongoose.Schema({
  id: { type: Number },
  zip_code: { type: Number },
  name_th: { type: String },
  name_en: { type: String },
  amphure_id: { type: Number },
  created_at: { type: Date },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

module.exports = mongoose.model("tambons", tambons);
