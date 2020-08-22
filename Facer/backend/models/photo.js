const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  url: { type: String, required: true },
  description: { type: String, require: false },
  dateAdded: { type: Date, required: false },
  isMain: { type: Boolean, required: false }
});

module.exports = mongoose.model("Photo", postSchema);
