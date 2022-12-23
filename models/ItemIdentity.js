const mongoose = require("mongoose");

const ItemIdentitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  inStockQuantity: {
    type: Number,
    required: true
  },
});

module.exports = mongoose.model("ItemIdentity", ItemIdentitySchema);
