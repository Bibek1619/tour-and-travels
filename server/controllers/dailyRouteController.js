const DailyRoute = require('../models/DailyRoute');

// Create Daily Route
exports.createDailyRoute = async (req, res) => {
  try {
    const payload = { ...req.body };

    // Keep availableSeats in sync with bookedSeats when provided
    if (Array.isArray(payload.bookedSeats) && payload.totalSeats != null) {
      payload.availableSeats = Math.max(
        0,
        payload.totalSeats - payload.bookedSeats.length
      );
    }

    const route = await DailyRoute.create(payload);

    res.status(201).json({
      success: true,
      message: 'Daily route created successfully',
      data: route,
    });
  } catch (error) {
    console.error('Create daily route error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Daily Routes
exports.getAllDailyRoutes = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      featured,
      departureLocation,
      arrivalLocation,
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (featured) query.featured = featured === 'true';
    if (departureLocation) query['departure.location'] = { $regex: departureLocation, $options: 'i' };
    if (arrivalLocation) query['arrival.location'] = { $regex: arrivalLocation, $options: 'i' };

    const routes = await DailyRoute.find(query)
      .populate('vehicle')
      .sort({ departureDate: 1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await DailyRoute.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: routes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Daily Route by ID
exports.getDailyRouteById = async (req, res) => {
  try {
    const route = await DailyRoute.findById(req.params.id).populate('vehicle');

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Daily route not found',
      });
    }

    res.status(200).json({
      success: true,
      data: route,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Daily Route
exports.updateDailyRoute = async (req, res) => {
  try {
    const route = await DailyRoute.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Daily route not found',
      });
    }

    const updateData = { ...req.body };

    // Keep availableSeats in sync with bookedSeats when they are updated
    if (Array.isArray(updateData.bookedSeats)) {
      const total = updateData.totalSeats ?? route.totalSeats;
      updateData.availableSeats = Math.max(0, total - updateData.bookedSeats.length);
    }

    const updatedRoute = await DailyRoute.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    ).populate('vehicle');

    res.status(200).json({
      success: true,
      message: 'Daily route updated successfully',
      data: updatedRoute,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Daily Route
exports.deleteDailyRoute = async (req, res) => {
  try {
    const route = await DailyRoute.findById(req.params.id);

    if (!route) {
      return res.status(404).json({
        success: false,
        message: 'Daily route not found',
      });
    }

    await route.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Daily route deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
