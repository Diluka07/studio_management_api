const mongoose = require("mongoose");

const MusicalItemSchema = new mongoose.Schema({
  isRented: {
    type: Boolean,
    required: [true, "Please add a rental status"],
  },
  invoice: {
    type: String,
  },
  itemCode: {
    type: mongoose.Schema.ObjectId,
    ref: "ItemIdentity",
    required: true,
  },
});

module.exports = mongoose.model("MusicalItem", MusicalItemSchema);
