const express = require("express");
const router = express.Router();
const { uploadTourImages } = require("../config/cloudinary");
const {
  createTourPackage,
  getAllTourPackages,
  getTourBySlug,
  updateTourPackage,
  deleteTourPackage,
} = require("../controllers/tourController");

router.post("/", uploadTourImages.array("images", 10), createTourPackage);
router.get("/", getAllTourPackages);
router.get("/:slug", getTourBySlug);
router.put("/:id", uploadTourImages.array("images", 10), updateTourPackage);
router.delete("/:id", deleteTourPackage);

module.exports = router;
