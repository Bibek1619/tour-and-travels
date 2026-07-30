/**
 * Cloudinary Image Helper
 * Transforms Cloudinary URLs for optimal display
 */

/**
 * Get optimized Cloudinary URL with specific transformations
 * @param {string} url - Original Cloudinary URL
 * @param {object} options - Transformation options
 * @returns {string} - Transformed URL
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) {
    return url; // Return as-is if not a Cloudinary URL
  }

  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    gravity = 'auto',
    quality = 'auto',
    format = 'auto'
  } = options;

  // Build transformation string
  const transformations = [];
  
  if (width !== 'auto' || height !== 'auto') {
    let transform = '';
    if (width !== 'auto') transform += `w_${width}`;
    if (height !== 'auto') transform += `,h_${height}`;
    if (crop) transform += `,c_${crop}`;
    if (gravity) transform += `,g_${gravity}`;
    transformations.push(transform);
  }
  
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);

  // Insert transformations into URL
  const transformString = transformations.filter(Boolean).join(',');
  
  if (transformString) {
    return url.replace('/upload/', `/upload/${transformString}/`);
  }

  return url;
};

/**
 * Preset transformations for common use cases
 */
export const ImagePresets = {
  // Card thumbnails (for lists)
  cardThumbnail: {
    width: 400,
    height: 300,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  
  // Hero/Featured images
  hero: {
    width: 1920,
    height: 1080,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  
  // Gallery thumbnails
  galleryThumb: {
    width: 200,
    height: 150,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  
  // Large detail view
  detailView: {
    width: 1200,
    height: 800,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },
  
  // Admin card preview
  adminCard: {
    width: 600,
    height: 400,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },

  // Vehicle card
  vehicleCard: {
    width: 500,
    height: 350,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  },

  // Region card
  regionCard: {
    width: 600,
    height: 400,
    crop: 'fill',
    gravity: 'auto',
    quality: 'auto',
    format: 'auto'
  }
};

/**
 * Quick helper functions
 */
export const getCardImage = (url) => getOptimizedImageUrl(url, ImagePresets.cardThumbnail);
export const getHeroImage = (url) => getOptimizedImageUrl(url, ImagePresets.hero);
export const getGalleryThumb = (url) => getOptimizedImageUrl(url, ImagePresets.galleryThumb);
export const getDetailImage = (url) => getOptimizedImageUrl(url, ImagePresets.detailView);
export const getAdminCardImage = (url) => getOptimizedImageUrl(url, ImagePresets.adminCard);
export const getVehicleCardImage = (url) => getOptimizedImageUrl(url, ImagePresets.vehicleCard);
export const getRegionCardImage = (url) => getOptimizedImageUrl(url, ImagePresets.regionCard);
