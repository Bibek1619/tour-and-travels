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
const auth = require("../middleware/authMiddleware");

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
  auth,
  upload.array("images", 5), // max 5 images
  createVehicle
);

// Update vehicle
router.put(
  "/:id",
  auth,
  upload.array("images", 5),
  updateVehicle
);

// Delete vehicle
router.delete("/:id", auth, deleteVehicle);

module.exports = router;
