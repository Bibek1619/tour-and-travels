interface ImageOptions {
  width?: string;
  height?: string;
  crop?: string;
  gravity?: string;
  quality?: string;
  format?: string;
}

export const getOptimizedImageUrl = (url: string, options: ImageOptions = {}): string => {
  if (!url) {
    return url;
  }

  // Handle Cloudinary URLs
  if (url.includes("cloudinary.com")) {
    const {
      width = "auto",
      height = "auto",
      crop = "fill",
      gravity = "auto",
      quality = "auto",
      format = "auto",
    } = options;

    const transformations: string[] = [];

    if (width !== "auto" || height !== "auto") {
      let transform = "";
      if (width !== "auto") transform += `w_${width}`;
      if (height !== "auto") transform += `,h_${height}`;
      if (crop) transform += `,c_${crop}`;
      if (gravity) transform += `,g_${gravity}`;
      transformations.push(transform);
    }

    if (quality) transformations.push(`q_${quality}`);
    if (format) transformations.push(`f_${format}`);

    const transformString = transformations.filter(Boolean).join(",");

    if (transformString) {
      return url.replace("/upload/", `/upload/${transformString}/`);
    }

    return url;
  }

  // Handle Unsplash URLs
  if (url.includes("images.unsplash.com")) {
    const {
      width = "1200",
      height,
      quality = "80",
      format = "auto",
    } = options;

    const urlObj = new URL(url);
    
    // Add Unsplash optimization parameters
    if (width && width !== "auto") urlObj.searchParams.set("w", width);
    if (height && height !== "auto") urlObj.searchParams.set("h", height);
    urlObj.searchParams.set("q", quality);
    if (format !== "auto") urlObj.searchParams.set("fm", format);
    urlObj.searchParams.set("fit", "crop");
    urlObj.searchParams.set("crop", "entropy");
    
    return urlObj.toString();
  }

  return url;
};

export const ImagePresets = {
  cardThumbnail: {
    width: "400",
    height: "300",
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    format: "auto",
  },
  hero: {
    width: "1200",
    height: "675",
    crop: "fill",
    gravity: "center",
    quality: "75",
    format: "webp",
  },
};

export const getCardImage = (url?: string) =>
  getOptimizedImageUrl(url ?? "", ImagePresets.cardThumbnail);

export const getHeroImage = (url?: string) =>
  getOptimizedImageUrl(url ?? "", ImagePresets.hero);