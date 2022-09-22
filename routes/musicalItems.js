const express = require("express");
const {
  getMusicalItem,
  getMusicalItems,
  addMusicalItem,
  deleteMusicalItem,
  updateMusicalItem,
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

module.exports = router;
