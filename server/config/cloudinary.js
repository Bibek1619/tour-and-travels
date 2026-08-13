const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Cloudinary storage for tours/treks
const tourStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tour-travels/tours',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ 
      width: 1200, 
      height: 800, 
      crop: 'fill',  // Changed from 'limit' to 'fill' for better display
      gravity: 'auto',  // Auto-focus on important parts
      quality: 'auto' 
    }]
  }
});

// Configure Cloudinary storage for regions
const regionStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tour-travels/regions',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ 
      width: 1200, 
      height: 800, 
      crop: 'fill',  // Changed from 'limit' to 'fill'
      gravity: 'auto',  // Auto-focus on important parts
      quality: 'auto' 
    }]
  }
});

// Configure Cloudinary storage for vehicles
const vehicleStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tour-travels/vehicles',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ 
      width: 1200, 
      height: 800, 
      crop: 'fill',  // Changed from 'limit' to 'fill'
      gravity: 'auto',  // Auto-focus on important parts
      quality: 'auto' 
    }]
  }
});

// Configure Cloudinary storage for categories
const categoryStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tour-travels/categories',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ 
      width: 1200, 
      height: 800, 
      crop: 'fill',
      gravity: 'auto',
      quality: 'auto' 
    }]
  }
});

// Create multer instances
const uploadTourImages = multer({
  storage: tourStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadRegionImage = multer({
  storage: regionStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadVehicleImages = multer({
  storage: vehicleStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

const uploadCategoryImage = multer({
  storage: categoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// Configure Cloudinary storage for homepage images
const homepageImageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tour-travels/homepage/images',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ 
      width: 1920, 
      height: 1080, 
      crop: 'fill', 
      gravity: 'auto', 
      quality: 'auto' 
    }]
  }
});

// Configure Cloudinary storage for homepage videos
const homepageVideoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'tour-travels/homepage/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'webm'],
  }
});

// Create multer instances
const uploadHomepageImage = multer({
  storage: homepageImageStorage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

const uploadHomepageVideo = multer({
  storage: homepageVideoStorage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit for videos
});

module.exports = {
  cloudinary,
  uploadTourImages,
  uploadRegionImage,
  uploadVehicleImages,
  uploadCategoryImage,
  uploadHomepageImage,
  uploadHomepageVideo
};
