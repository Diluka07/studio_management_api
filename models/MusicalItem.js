const mongoose = require("mongoose");

const MusicalItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 50 characters"],
  },
  photo: {
    type: String,
    default: "no-photo.jpg",
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("MusicalItem", MusicalItemSchema);
