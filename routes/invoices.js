const express = require("express");
const {
  createMusicalItemInvoice,
  getAllMusicalItemInvoice,
  getSingleMusicalItemInvoice,
  finishMusicalItemInvoice
} = require("../controllers/invoices");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/product")
  .get(protect, authorize("manager", "cashier"), getAllMusicalItemInvoice)
  .post(protect, authorize("manager", "cashier"), createMusicalItemInvoice);
router
  .route("/:id")
  .get(protect, authorize("manager", "cashier"), getSingleMusicalItemInvoice)
router
  .route("/finish")
  .post(protect, authorize("manager", "cashier"), finishMusicalItemInvoice)

module.exports = router;
