const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const ItemRentalInvoice = require("../models/ItemRentalInvoice");
const MusicalItem = require("../models/MusicalItem");
const ItemIdentity = require("../models/ItemIdentity");

// @desc    create new musical item invoice
// @route   POST /api/invoices/product
// @access  Private
exports.createMusicalItemInvoice = asyncHandler(async (req, res, next) => {
  let invoice = await ItemRentalInvoice.create({
    customer: req.body.formData.customerId,
    expectedReturnDate: req.body.formData.returnDate,
    expectedReturnTime: req.body.formData.returnTime,
    rentalCost: req.body.formData.totalRentalCost,
    items: req.body.products,
    cashierRent: req.body.formData.cashierId,
  });

  for (let i = 0; i < req.body.products.length; i++) {
    const itemData = await ItemIdentity.findById(req.body.products[i].itemCode);
    await ItemIdentity.findByIdAndUpdate(
      req.body.products[i].itemCode,
      {
        inStockQuantity:
          itemData.inStockQuantity - req.body.products[i].quantity,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    for (let j = 0; j < req.body.products[i].itemIds.length; j++) {
      await MusicalItem.findByIdAndUpdate(
        req.body.products[i].itemIds[j],
        {
          isRented: true,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  }

  res.status(201).json({
    success: true,
    data: { invoice },
  });
});

// @desc    Get All invoices
// @route   GET /api/invoices/product
// @access  Private
exports.getAllMusicalItemInvoice = asyncHandler(async (req, res, next) => {
  let query = ItemRentalInvoice.find().populate("customer");
  const invoices = await query;
  res.status(200).json({ success: true, data: invoices });
});

// @desc    Get single invoices
// @route   GET /api/invoices/:id
// @access  Private
exports.getSingleMusicalItemInvoice = asyncHandler(async (req, res, next) => {
  const invoice = await ItemRentalInvoice.findById(req.params.id)
    .populate("customer")
    .populate("cashierRent");
  if (!invoice) {
    return next(
      new ErrorResponse(
        `Musical Item invoice found with id of ${req.params.id}`,
        404
      )
    );
  }
  res.status(200).json({ success: true, data: invoice });
});

// @desc    Finish musical item invoice
// @route   POST /api/invoices/finish
// @access  Private
exports.finishMusicalItemInvoice = asyncHandler(async (req, res, next) => {
  await ItemRentalInvoice.findByIdAndUpdate(
    req.body.id,
    {
      isFinished: true,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  for (let i = 0; i < req.body.products.length; i++) {
    const itemData = await ItemIdentity.findById(req.body.products[i].itemCode);
    await ItemIdentity.findByIdAndUpdate(
      req.body.products[i].itemCode,
      {
        inStockQuantity:
          itemData.inStockQuantity + req.body.products[i].quantity,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    for (let j = 0; j < req.body.products[i].itemIds.length; j++) {
      await MusicalItem.findByIdAndUpdate(
        req.body.products[i].itemIds[j],
        {
          isRented: false,
        },
        {
          new: true,
          runValidators: true,
        }
      );
    }
  }

  res.status(201).json({
    success: true,
  });
});
