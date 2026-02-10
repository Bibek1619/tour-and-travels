const Vehicle = require("../models/Vehicle");
const fs = require("fs");
const path = require("path");


exports.createVehicle = async (req, res) => {
  try {


    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images received",
      });
    }
const images = req.files.map(
  (file) =>
    `${req.protocol}://${req.get("host")}/images/${file.filename}`
);



    const availableCount=Number(req.body.availableCount || 1);

    const vehicle = await Vehicle.create({
      category: req.body.category,
      fuelType: req.body.fuelType,
      brand: req.body.brand,
      model: req.body.model,
      name: req.body.name,
      dailyRate: Number(req.body.dailyRate),
      capacity: Number(req.body.capacity),
      luggage: req.body.luggage,
      features: req.body.features
        ? Array.isArray(req.body.features)
          ? req.body.features
          : [req.body.features]
        : [],
      bestFor: req.body.bestFor,
      images,
      availableCount,
      isAvailable: availableCount > 0, // Set availability based on count
    });

    res.status(201).json({
      success: true,
      vehicle,
    });
  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};



exports.getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: vehicles.length,
      vehicles,
    });
  } catch (error) {
    console.error("❌ Fetch vehicles error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ======================================================
   📄 GET VEHICLE BY ID
====================================================== */
exports.getVehicleById = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle)
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });

    res.json({
      success: true,
      vehicle,
    });
  } catch (error) {
    console.error("❌ Get vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ======================================================
   ✏️ UPDATE VEHICLE
====================================================== */
exports.updateVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle)
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });

    let newImages = [];
    if (req.files && req.files.length > 0) {
      newImages = req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/images/${file.filename}`
      );
    }

    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        images: [...vehicle.images, ...newImages],
      },
      { new: true }
    );

    res.json({
      success: true,
      vehicle: updatedVehicle,
    });
  } catch (error) {
    console.error("❌ Update vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/* ======================================================
   ❌ DELETE VEHICLE
====================================================== */
exports.deleteVehicle = async (req, res) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);

    if (!vehicle)
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });

    // 🧹 Delete images
    vehicle.images.forEach((img) => {
      const filename = img.split("/images/")[1];
      if (filename) {
        const filePath = path.join(
          __dirname,
          "..",
          "public",
          "images",
          filename
        );
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      }
    });

    await vehicle.deleteOne();

    res.json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    console.error("❌ Delete vehicle error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
