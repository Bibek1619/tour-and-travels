const express = require("express");
const router = express.Router();
const {
  createTourPackage,
  getAllTourPackages,
  getTourPackageById,
  updateTourPackage,
  deleteTourPackage,
} = require("../controllers/tourController");

router.post("/", createTourPackage);
router.get("/", getAllTourPackages);
router.get("/:id", getTourPackageById);
router.put("/:id", updateTourPackage);
router.delete("/:id", deleteTourPackage);

module.exports = router;
