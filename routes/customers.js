const express = require("express");
const {
  createCustomer,
  updateCustomer,
  getAllCustomers,
  getSingleCustomer,
} = require("../controllers/customer");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router
  .route("/")
  .get(protect, authorize("manager", "cashier"), getAllCustomers)
  .post(protect, authorize("manager"), createCustomer)
  .put(protect, authorize("manager"), updateCustomer);
router.route("/:id").get(protect, authorize("manager"), getSingleCustomer);

module.exports = router;
