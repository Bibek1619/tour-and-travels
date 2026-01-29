const express = require("express");
const router = express.Router();

const {
  createVehicle,
  getVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
} = require("../controllers/vehicleController");

const upload=require("../middleware/upload");
const {protect}= require("../middleware/authMiddleware");

/* ======================================================
   PUBLIC ROUTES
====================================================== */

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
  upload.array("images", 5), // max 5 images
  createVehicle
);

// Update vehicle
router.put(
  "/:id",
  protect,
  upload.array("images", 5),
  updateVehicle
);

// Delete vehicle
router.delete("/:id", protect, deleteVehicle);

module.exports = router;
