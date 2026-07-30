const express = require("express");
const router = express.Router();
const { uploadVehicleImages } = require("../config/cloudinary");

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const {protect,adminOnly}= require("../middleware/authMiddleware");


// Get all vehicles
router.get("/", getVehicles);

// Get single vehicle
router.get("/:id", getVehicleById);

/* ======================================================
   ADMIN PROTECTED ROUTES
====================================================== */

// Create vehicle (multiple images)
router.post(
  "/",
  protect,
  adminOnly,
  uploadVehicleImages.array("images", 5), // max 5 images
  createVehicle
);

// Update vehicle
router.put(
  "/:id",
  protect,
  adminOnly,
  uploadVehicleImages.array("images", 5),
  updateVehicle
);

// Delete vehicle
router.delete("/:id", protect,adminOnly 
  ,deleteVehicle);

module.exports = router;
