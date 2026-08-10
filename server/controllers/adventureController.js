const Adventure = require('../models/Adventure');
const slugify = require('slugify');

// Create Adventure
exports.createAdventure = async (req, res) => {
  try {
    const slug = slugify(req.body.name, {
      lower: true,
      strict: true,
    });

    // Handle images from Cloudinary
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.path);
    }

    // Parse arrays if sent as strings
    const included = Array.isArray(req.body.included) 
      ? req.body.included 
      : req.body.included ? [req.body.included] : [];
    
    const excluded = Array.isArray(req.body.excluded)
      ? req.body.excluded
      : req.body.excluded ? [req.body.excluded] : [];
    
    const requirements = Array.isArray(req.body.requirements)
      ? req.body.requirements
      : req.body.requirements ? [req.body.requirements] : [];

    const adventure = await Adventure.create({
      name: req.body.name,
      slug,
      category: req.body.category,
      description: req.body.description,
      shortDescription: req.body.shortDescription,
      location: req.body.location,
      duration: req.body.duration,
      difficulty: req.body.difficulty,
      minAge: Number(req.body.minAge),
      price: Number(req.body.price),
      groupSize: {
        min: Number(req.body.groupSizeMin || 1),
        max: Number(req.body.groupSizeMax || 10)
      },
      included,
      excluded,
      requirements,
      safetyInfo: req.body.safetyInfo,
      bestSeason: req.body.bestSeason,
      images,
      featured: req.body.featured === 'true' || req.body.featured === true,
      status: req.body.status || 'published',
    });

    res.status(201).json({
      success: true,
      message: 'Adventure created successfully',
      data: adventure,
    });
  } catch (error) {
    console.error('Create adventure error:', error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Adventures
exports.getAllAdventures = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      category,
      status,
      difficulty,
      featured,
      search,
    } = req.query;

    const query = {};

    if (category) query.category = category;
    if (status) query.status = status;
    if (difficulty) query.difficulty = difficulty;
    if (featured) query.featured = featured === 'true';
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const adventures = await Adventure.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Adventure.countDocuments(query);

    res.status(200).json({
      success: true,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      data: adventures,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Adventure by Slug
exports.getAdventureBySlug = async (req, res) => {
  try {
    const adventure = await Adventure.findOne({
      slug: req.params.slug,
      status: 'published',
    });

    if (!adventure) {
      return res.status(404).json({
        success: false,
        message: 'Adventure not found',
      });
    }

    res.status(200).json({
      success: true,
      data: adventure,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get Single Adventure by ID
exports.getAdventureById = async (req, res) => {
  try {
    const adventure = await Adventure.findById(req.params.id);

    if (!adventure) {
      return res.status(404).json({
        success: false,
        message: 'Adventure not found',
      });
    }

    res.status(200).json({
      success: true,
      data: adventure,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update Adventure
exports.updateAdventure = async (req, res) => {
  try {
    const adventure = await Adventure.findById(req.params.id);

    if (!adventure) {
      return res.status(404).json({
        success: false,
        message: 'Adventure not found',
      });
    }

    // Update slug if name changed
    if (req.body.name) {
      req.body.slug = slugify(req.body.name, {
        lower: true,
        strict: true,
      });
    }

    // Update images: keep existing images and append newly uploaded ones
    if (req.body.existingImages || (req.files && req.files.length > 0)) {
      let images = [];
      if (req.body.existingImages) {
        try {
          images = JSON.parse(req.body.existingImages);
        } catch (e) {
          images = Array.isArray(req.body.existingImages)
            ? req.body.existingImages
            : [];
        }
      }
      if (req.files && req.files.length > 0) {
        images = [...images, ...req.files.map((file) => file.path)];
      }
      req.body.images = images.filter(Boolean);
    }

    const updatedAdventure = await Adventure.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Adventure updated successfully',
      data: updatedAdventure,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Adventure
exports.deleteAdventure = async (req, res) => {
  try {
    const adventure = await Adventure.findById(req.params.id);

    if (!adventure) {
      return res.status(404).json({
        success: false,
        message: 'Adventure not found',
      });
    }

    await adventure.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Adventure deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
