interface ImageOptions {
  width?: string;
  height?: string;
  crop?: string;
  gravity?: string;
  quality?: string;
  format?: string;
}

export const getOptimizedImageUrl = (url: string, options: ImageOptions = {}): string => {
  if (!url || !url.includes("cloudinary.com")) {
    return url;
  }

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
    width: "1920",
    height: "1080",
    crop: "fill",
    gravity: "auto",
    quality: "auto",
    format: "auto",
  },
};

export const getCardImage = (url?: string) =>
  getOptimizedImageUrl(url ?? "", ImagePresets.cardThumbnail);

export const getHeroImage = (url?: string) =>
  getOptimizedImageUrl(url ?? "", ImagePresets.hero);