const express = require('express');
const router = express.Router();
const { uploadTourImages } = require('../config/cloudinary');
const {
  createAdventure,
  getAllAdventures,
  getAdventureBySlug,
  getAdventureById,
  updateAdventure,
  deleteAdventure,
} = require('../controllers/adventureController');

// Public routes
router.get('/', getAllAdventures);
router.get('/slug/:slug', getAdventureBySlug);
router.get('/:id', getAdventureById);

// Admin routes (add auth middleware later if needed)
router.post('/', uploadTourImages.array('images', 10), createAdventure);
router.put('/:id', uploadTourImages.array('images', 10), updateAdventure);
router.delete('/:id', deleteAdventure);

module.exports = router;
