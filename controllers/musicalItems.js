const path = require("path");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const MusicalItem = require("../models/MusicalItem");

// @desc    Get all musical items
// @route   GET /api/musicalitems
// @route   GET /api/categories/:categoryId/musicalitems
// @access  Public
exports.getMusicalItems = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.categoryId) {
    query = MusicalItem.find({ category: req.params.categoryId });
  } else {
    query = MusicalItem.find().populate({
      path: "category",
      select: "name",
    });
    //populate("category");
  }
  const musicalItems = await query;
  res.status(200).json({ success: true, data: musicalItems });
});

// @desc    Get single musical item
// @route   GET /api/musicalitems/:id
// @access  Public
exports.getMusicalItem = asyncHandler(async (req, res, next) => {
  const musicalItem = await MusicalItem.findById(req.params.id).populate({
    path: "category",
    select: "name",
  });
  if (!musicalItem) {
    return next(
      new ErrorResponse(
        `Musical Item not found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: musicalItem });
});

// @desc    Add new musical item
// @route   POST /api/musicalitems
// @access  Private
exports.addMusicalItem = asyncHandler(async (req, res, next) => {
  const musicalItem = await MusicalItem.create(req.body);

  res.status(201).json({
    success: true,
    data: musicalItem,
  });
});

// @desc    Update musical item
// @route   PUT /api/musicalitems/:id
// @access  Private
exports.updateMusicalItem = asyncHandler(async (req, res, next) => {
  const musicalItem = await MusicalItem.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!musicalItem) {
    return next(
      new ErrorResponse(
        `Musical Item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: musicalItem });
});

// @desc    Delete musical item
// @route   DELETE /api/musicalitems/:id
// @access  Private
exports.deleteMusicalItem = asyncHandler(async (req, res, next) => {
  const musicalItem = await MusicalItem.findByIdAndDelete(req.params.id);

  if (!musicalItem) {
    return next(
      new ErrorResponse(
        `Musical Item not found with id of ${req.params.id}`,
        404
      )
    );
  }

  res.status(200).json({ success: true, data: {} });
});

// @desc    Upload photo for musical item
// @route   DELETE /api/musicalitems/:id/photo
// @access  Private
exports.musicalItemPhotoUpload = asyncHandler(async (req, res, next) => {
  const musicalItem = await MusicalItem.findById(req.params.id);

  if (!musicalItem) {
    return next(
      new ErrorResponse(
        `Musical Item not found with id of ${req.params.id}`,
        404
      )
    );
  }
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(
        `Please upload an image file less than ${process.env.MAX_FILE_UPLOAD}`,
        400
      )
    );
  }

  // Create custom file name
  file.name = `photo_${musicalItem._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await MusicalItem.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name,
    });
  });

  console.log(file.name);
});
