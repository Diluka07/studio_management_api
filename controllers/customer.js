const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Customer = require("../models/Customer");

// @desc    Create Customer
// @route   POST /api/customers
// @access  Private/Admin
exports.createCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.create(req.body);
  
    res.status(201).json({
      success: true,
      data: customer,
    });
  });
  
  // @desc    Update Customer
  // @route   PUT /api/customers/:id
  // @access  Private/Admin
  exports.updateCustomer = asyncHandler(async (req, res, next) => {
    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  
    res.status(201).json({
      success: true,
      data: customer,
    });
  });

  // @desc    Get All Customers
  // @route   GET /api/customers
  // @access  Public
  exports.getAllCustomers = asyncHandler(async (req, res, next) => {
    const customers = await Customer.find();
  
    res.status(200).json({
      success: true,
      data: customers,
    });
  });