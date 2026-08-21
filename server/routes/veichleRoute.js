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
  uploadVehicleImages.array("images", 5),
  createVehicle
);

// Update vehicle
router.put(
  "/:id",
  uploadVehicleImages.array("images", 5),
  updateVehicle
);

// Delete vehicle
router.delete("/:id", deleteVehicle);

module.exports = router;
