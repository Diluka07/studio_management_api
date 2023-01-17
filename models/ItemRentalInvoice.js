const mongoose = require("mongoose");

const ItemRentalInvoiceSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "Customer",
    required: true,
  },
  rentalDate: {
    type: Date,
    default: Date.now,
  },
  expectedReturnDate: {
    type: Date,
    required: [true, "Please add a Return Date"],
  },
  actualReturnDate: {
    type: Date,
  },
  rentalCost: {
    type: Number,
    required: [true, "Please add rental cost"]
  },
  latePeriod: {
    type: Number,
  },
  extraCharge: {
    type: Number,
  },
  totalCost: {
    type: Number,
  },
  cashierRent: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  cashierReturn: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  items:{
    any:Array,
    required: [true, "Please add items to invoice"]
  }
  
});

module.exports = mongoose.model("ItemRentalInvoice", ItemRentalInvoiceSchema);