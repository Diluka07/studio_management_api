const express = require("express");
const {
  getMusicalItem,
  getMusicalItems,
  addMusicalItem,
  updateMusicalItem,
  getProduct,
  deleteMusicalItem,
  musicalItemPhotoUpload,
} = require("../controllers/musicalItems");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router.route("/:id/photo").put(musicalItemPhotoUpload);

router
  .route("/")
  .get(protect, authorize("manager", "cashier"), getMusicalItems)
  .post(protect, authorize("manager"), addMusicalItem);
router
  .route("/:id")
  .get(protect, authorize("manager", "cashier"), getMusicalItem)
  .put(protect, authorize("manager"), updateMusicalItem)
  .delete(protect, authorize("manager"), deleteMusicalItem);
router  
  .route("/product/:id")
  .get(protect, authorize("manager", "cashier"), getProduct)

module.exports = router;
