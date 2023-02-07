const express = require("express");
const {
  createMusicalItemInvoice,
  getAllMusicalItemInvoice,
} = require("../controllers/invoices");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/product")
  .get(protect, authorize("manager", "cashier"), getAllMusicalItemInvoice)
  .post(protect, authorize("manager", "cashier"), createMusicalItemInvoice);
router;

module.exports = router;
