const express = require('express');
const router = express.Router();
const {
  createDailyRoute,
  getAllDailyRoutes,
  getDailyRouteById,
  updateDailyRoute,
  deleteDailyRoute,
} = require('../controllers/dailyRouteController');

// Public routes
router.get('/', getAllDailyRoutes);
router.get('/:id', getDailyRouteById);

// Admin routes
router.post('/', createDailyRoute);
router.put('/:id', updateDailyRoute);
router.delete('/:id', deleteDailyRoute);

module.exports = router;
