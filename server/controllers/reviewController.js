const Review = require("../models/Review");
const TourPackage = require("../models/tourPackage");

// =====================================================
// Recompute a tour's average rating + count (aggregate)
// =====================================================
const recomputeTourRating = async (tourId) => {
  const result = await Review.aggregate([
    { $match: { tour: tourId, status: "approved" } },
    {
      $group: {
        _id: null,
        avg: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  const agg = result[0] || { avg: 0, count: 0 };

  await TourPackage.findByIdAndUpdate(
    tourId,
    {
      rating: Math.round(agg.avg * 10) / 10,
      reviewsCount: agg.count,
    },
    { runValidators: true }
  );
};

// =====================================================
// CREATE REVIEW (public - from tour detail page)
// =====================================================
exports.createReview = async (req, res) => {
  try {
    const { tour, name, email, rating, review, user } = req.body;

    if (!tour || !name || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "Tour, name, rating and review are required.",
      });
    }

    const tourExists = await TourPackage.findById(tour);
    if (!tourExists) {
      return res.status(404).json({
        success: false,
        message: "Tour not found",
      });
    }

    const newReview = await Review.create({
      tour,
      user: user || null,
      name: name.trim(),
      email: email ? email.trim().toLowerCase() : undefined,
      rating: Number(rating),
      review: review.trim(),
    });

    await recomputeTourRating(tour);

    res.status(201).json({
      success: true,
      message: "Thanks for reviewing us!",
      data: newReview,
    });
  } catch (error) {
    console.error("Create review error:", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET REVIEWS BY TOUR (paginated)
// =====================================================
exports.getReviewsByTour = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { tourId } = req.params;

    const query = { tour: tourId, status: "approved" };

    const reviews = await Review.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Review.countDocuments(query);

    const ratingAgg = await Review.aggregate([
      { $match: query },
      { $group: { _id: null, avg: { $avg: "$rating" } } },
    ]);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      avgRating: ratingAgg[0] ? Math.round(ratingAgg[0].avg * 10) / 10 : 0,
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// GET ALL REVIEWS (admin)
// =====================================================
exports.getAllReviews = async (req, res) => {
  try {
    const { page = 1, limit = 50, status } = req.query;

    const query = {};
    if (status) query.status = status;

    const reviews = await Review.find(query)
      .populate("tour", "title slug")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Review.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: reviews,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// UPDATE REVIEW (admin - e.g. approve / reject)
// =====================================================
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await recomputeTourRating(review.tour);

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// DELETE REVIEW (admin)
// =====================================================
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    await review.deleteOne();
    await recomputeTourRating(review.tour);

    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
