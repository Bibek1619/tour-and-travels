const TourPackage=
require("../models/tourPackage")
const slugify = require("slugify");

// =====================================================
// CREATE TOUR PACKAGE
// =====================================================
exports.createTourPackage = async (req, res) => {
  try {

    const slug = slugify(req.body.title, {
      lower: true,
      strict: true,
    });

    // Handle images from Cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path); // Cloudinary returns full URL in file.path
    }

    // Parse highlights array
    let highlights = [];
    if (req.body.highlights) {
      highlights = Array.isArray(req.body.highlights)
        ? req.body.highlights
        : [req.body.highlights];
    }

    // Parse itinerary
    let itinerary = [];
    if (req.body["itinerary[]"] || req.body.itinerary) {
      const raw = req.body["itinerary[]"] || req.body.itinerary;

      const arr = Array.isArray(raw) ? raw : [raw];

      itinerary = arr.map((item) => JSON.parse(item));
    }

    const tour = await TourPackage.create({
      title: req.body.title,
      slug,
      category: req.body.category,
      location: req.body.location,
      difficulty: req.body.difficulty,
      region: req.body.region || null, // Add region field
      durationDays: Number(req.body.durationDays),
      price: Number(req.body.price),
      maxAltitude: req.body.maxAltitude,
      bestSeason: req.body.bestSeason,
      shortOverview: req.body.shortOverview,
      status: req.body.status || "draft",

      highlights,
      itinerary,

      images: images.length ? images : [],
    });

    res.status(201).json({
      success: true,
      message: "Tour package created successfully",
      data: tour,
    });

  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL TOUR PACKAGES (FILTER + PAGINATION + SEARCH)
// =====================================================
exports.getAllTourPackages = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      status,
      search,
      region, // Add region filter
    } = req.query;

    const query = {};

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by status (draft/published)
    if (status) {
      query.status = status;
    }

    // Filter by region (for treks)
    if (region) {
      query.region = region;
    }

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tours = await TourPackage.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .populate("region", "name description"); // Populate region details

    const total = await TourPackage.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: tours,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET SINGLE TOUR BY SLUG (Better for SEO)
// =====================================================
exports.getTourBySlug = async (req, res) => {
  try {
    const tour = await TourPackage.findOne({
      slug: req.params.slug,
      status: "published",
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE TOUR
// =====================================================
exports.updateTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    // Update slug if title changed
    if (req.body.title) {
      req.body.slug = slugify(req.body.title, {
        lower: true,
        strict: true,
      });
    }

    // Update images if new images uploaded
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map((file) => file.path); // Cloudinary URLs
    }

    const updatedTour = await TourPackage.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE TOUR
// =====================================================
exports.deleteTourPackage = async (req, res) => {
  try {
    const tour = await TourPackage.findById(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    await tour.deleteOne();

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
