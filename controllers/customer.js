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
  console.log(req.body);
  const customer = await Customer.findByIdAndUpdate(
    req.body.id,
    {
      nic: req.body.nic,
      name: req.body.name,
      contactNumber1: req.body.contactNumber1,
      contactNumber2: req.body.contactNumber2,
      address: req.body.address,
    },
    {
      new: true,
      runValidators: true,
    }
  );

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

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private
exports.getSingleCustomer = asyncHandler(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) {
    return next(
      new ErrorResponse(`No customer found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: customer });
});
