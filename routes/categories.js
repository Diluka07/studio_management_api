const express = require("express");
const {
  getCategories,
  getCategory,
  addCategory,
  updateCategory,
} = require("../controllers/catogories");

// Include other resource routers
const musicalItemRouter = require("./musicalItems");

const router = express.Router();

const { protect, authorize } = require("../middleware/auth");

// Re-route into other resource routers
router.use("/:categoryId/musicalitems", musicalItemRouter);

router
  .route("/")
  .get(protect, authorize("manager", "cashier"), getCategories)
  .post(protect, authorize("manager"), addCategory);
router
  .route("/:id")
  .get(protect, authorize("manager", "cashier"), getCategory)
  .put(protect, authorize("manager"), updateCategory);

module.exports = router;
