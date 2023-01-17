const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");
const ItemRentalInvoice = require("../models/ItemRentalInvoice");
const InvoiceItem = require("../models/InvoiceItem");

// @desc    create new musical item invoice
// @route   POST /api/invoice/musical
// @access  Public
exports.createMusicalItemInvoice = asyncHandler(async (req, res, next) => {
  let invoice = await ItemRentalInvoice.create({
    customer: req.body.customerId,
    expectedReturnDate: req.body.returnDate,
    rentalCost: req.body.rentalCost,
    cashierRent: req.body.cashierIdRent,
  });

  // req.body.items.forEach((item) = async => {
  //    await InvoiceItem.create({invoice: item.invoiceId, item: item.itemId})
  // });

  for (let i = 0; i < req.body.items.length; i++) {
    await InvoiceItem.create({ invoice: item.invoiceId, item: item.itemId });
  }

  //res.status(200).json({ success: true, data: musicalItems });
});
