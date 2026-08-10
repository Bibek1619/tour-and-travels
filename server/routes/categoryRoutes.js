const express = require('express');
const router = express.Router();
const { uploadCategoryImage } = require('../config/cloudinary');
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');

// Routes
router.post('/', uploadCategoryImage.single('image'), createCategory);
router.get('/', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', uploadCategoryImage.single('image'), updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
