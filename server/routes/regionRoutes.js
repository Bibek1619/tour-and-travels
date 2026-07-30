const express = require('express');
const router = express.Router();
const { uploadRegionImage } = require('../config/cloudinary');
const {
  createRegion,
  getAllRegions,
  getRegionById,
  updateRegion,
  deleteRegion
} = require('../controllers/regionController');

// Routes
router.post('/', uploadRegionImage.single('image'), createRegion);
router.get('/', getAllRegions);
router.get('/:id', getRegionById);
router.put('/:id', uploadRegionImage.single('image'), updateRegion);
router.delete('/:id', deleteRegion);

module.exports = router;
