const express = require("express");
const router = express.Router();
const {
  createReview,
  getReviewsByTour,
  getAllReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Public routes
router.post("/", createReview);
router.get("/tour/:tourId", getReviewsByTour);

// Admin routes
router.get("/", getAllReviews);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

module.exports = router;
