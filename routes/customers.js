const express = require("express");
const {
  createCustomer,
  updateCustomer,
  getAllCustomers,
} = require("../controllers/customer");
const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

router.use(protect);
router.use(authorize("manager"));

router.route("/").get(getAllCustomers).post(createCustomer);
router.route("/:id").put(updateCustomer);

module.exports = router;
