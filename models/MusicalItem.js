const mongoose = require("mongoose");

const MusicalItemSchema = new mongoose.Schema({
  isRented: {
    type: Boolean,
    required: [true, "Please add a rental status"],
    default: false,
  },
  invoice: {
    type: String,
  },
  itemCode: {
    type: mongoose.Schema.ObjectId,
    ref: "ItemIdentity",
    required: true,
  },
  isRemoved: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("MusicalItem", MusicalItemSchema);
