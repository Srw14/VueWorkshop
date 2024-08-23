const { type } = require("express/lib/response");
const mongoose = require("mongoose");
const amphures = new mongoose.Schema({
  id: { type: Number },
  name_th: { type: String },
  name_en: { type: String },
  province_id: { type: Number },
  created_at: { type: Date },
  updated_at: { type: Date },
  deleted_at: { type: Date },
});

module.exports = mongoose.model("amphures", amphures);