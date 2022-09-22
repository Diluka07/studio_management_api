const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const Category = require("../models/Category");

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public

exports.getCategories = asyncHandler(async (req, res, next) => {
  let query = Category.find().populate("musicalItems");
  const categories = await query;

  res.status(200).json({
    success: true,
    data: categories,
  });
});

// @desc    Get single category
// @route   GET /api/categories/:id
// @access  Public

exports.getCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: category });
});

// @desc    Add new category
// @route   POST /api/categories
// @access  Private
exports.addCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.create(req.body);

  res.status(201).json({
    success: true,
    data: category,
  });
});

// @desc    Update category
// @route   PUT /api/musicalitems/:id
// @access  Private
exports.updateCategory = asyncHandler(async (req, res, next) => {
  let category = await Category.findById(req.params.id);

  if (!category) {
    return next(
      new ErrorResponse(`Category not found with id of ${req.params.id}`, 404)
    );
  }

  category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: category });
});
