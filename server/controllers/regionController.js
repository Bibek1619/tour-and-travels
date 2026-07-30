const Region = require('../models/Region');

// Create new region
exports.createRegion = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const regionData = {
      name,
      description,
    };

    // Handle image upload from Cloudinary
    if (req.file) {
      regionData.image = req.file.path; // Cloudinary full URL
    }

    const region = await Region.create(regionData);

    res.status(201).json({
      success: true,
      message: 'Region created successfully',
      data: region
    });
  } catch (error) {
    console.error('Error creating region:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create region',
      error: error.message
    });
  }
};

// Get all regions
exports.getAllRegions = async (req, res) => {
  try {
    const regions = await Region.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: regions
    });
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch regions',
      error: error.message
    });
  }
};

// Get single region by ID
exports.getRegionById = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);

    if (!region) {
      return res.status(404).json({
        success: false,
        message: 'Region not found'
      });
    }

    res.status(200).json({
      success: true,
      data: region
    });
  } catch (error) {
    console.error('Error fetching region:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch region',
      error: error.message
    });
  }
};

// Update region
exports.updateRegion = async (req, res) => {
  try {
    const { name, description } = req.body;
    
    const updateData = {
      name,
      description,
    };

    // Handle image upload from Cloudinary
    if (req.file) {
      updateData.image = req.file.path; // Cloudinary full URL
    }

    const region = await Region.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!region) {
      return res.status(404).json({
        success: false,
        message: 'Region not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Region updated successfully',
      data: region
    });
  } catch (error) {
    console.error('Error updating region:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update region',
      error: error.message
    });
  }
};

// Delete region
exports.deleteRegion = async (req, res) => {
  try {
    const region = await Region.findByIdAndDelete(req.params.id);

    if (!region) {
      return res.status(404).json({
        success: false,
        message: 'Region not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Region deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting region:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete region',
      error: error.message
    });
  }
};
