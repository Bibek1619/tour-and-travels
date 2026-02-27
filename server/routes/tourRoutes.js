const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload"); // your multer file
const {
  createTourPackage,
  getAllTourPackages,
  getTourBySlug,
  updateTourPackage,
  deleteTourPackage,
} = require("../controllers/tourController");

router.post("/", upload.array("images", 10), createTourPackage);
router.get("/", getAllTourPackages);
router.get("/:slug", getTourBySlug);
router.put("/:id", upload.array("images", 10), updateTourPackage);
router.delete("/:id", deleteTourPackage);

module.exports = router;
