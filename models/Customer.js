const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  nic: {
    type: String,
    required: [true, "Please add NIC number"],
    unique: true,
    trim: true,
    maxlength: [15, "NIC number can not be more than 15 characters"],
  },
  name: {
    type: String,
    required: [true, "Please add a name"],
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  address: {
    type: String,
    required: [true, "Please add a address"],
    maxlength: [500, "Address can not be more than 50 characters"],
  },
  contactNumber1: {
    type: Number,
    required: [true, "Please add a contact number"],
    maxlength: [10, "Contact number can not be more than 10 numbers"],
  },
  contactNumber2: {
    type: Number,
    maxlength: [10, "Contact number can not be more than 10 numbers"],
  },
  nicPhoto: {
    type: String,
    default: "no-photo.jpg",
  },
});

module.exports = mongoose.model("Customer", CustomerSchema);
