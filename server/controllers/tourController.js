const TourPackages=
require("../models/tourPackage")
const slugify = require("slugify");

// =====================================================
// CREATE TOUR PACKAGE
// =====================================================
exports.createTourPackage = async (req, res) => {
  try {
    // Generate slug automatically
    const slug = slugify(req.body.title, {
      lower: true,
      strict: true,
    });

    // Handle images (if using multer)
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map(
        (file) => `/uploads/${file.filename}`
      );
    }

    const tour = await TourPackage.create({
      ...req.body,
      slug,
      images,
    });

    res.status(201).json({
      success: true,
      message: "Tour package created successfully",
      data: tour,
    });
  } catch (error) {
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

    // Search by title
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const tours = await TourPackage.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

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
      req.body.images = req.files.map(
        (file) => `/uploads/${file.filename}`
      );
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
