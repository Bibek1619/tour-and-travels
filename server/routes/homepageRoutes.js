const express = require("express");
const router = express.Router();
const { uploadHomepageImage, uploadHomepageVideo, cloudinary } = require("../config/cloudinary");
const HomepageContent = require("../models/HomepageContent");

// =====================================================
// GET homepage content
// =====================================================
router.get("/", async (req, res) => {
  try {
    let content = await HomepageContent.findOne();
    if (!content) {
      content = await HomepageContent.create({});
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    console.error("Get homepage content error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch homepage content" });
  }
});

// =====================================================
// PUT update homepage content (full save)
// =====================================================
router.put("/", async (req, res) => {
  try {
    let content = await HomepageContent.findOne();
    if (content) {
      content.set(req.body);
      await content.save();
    } else {
      content = await HomepageContent.create(req.body);
    }
    res.status(200).json({ success: true, data: content });
  } catch (error) {
    console.error("Update homepage content error:", error);
    res.status(500).json({ success: false, message: "Failed to update homepage content" });
  }
});

// =====================================================
// Upload a single image to Cloudinary
// =====================================================
router.post("/upload-image", uploadHomepageImage.single("image"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No image file provided" });
    }
    res.status(200).json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload image" });
  }
});

// =====================================================
// Upload a single video to Cloudinary
// =====================================================
router.post("/upload-video", uploadHomepageVideo.single("video"), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No video file provided" });
    }
    res.status(200).json({
      success: true,
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (error) {
    console.error("Video upload error:", error);
    res.status(500).json({ success: false, message: "Failed to upload video" });
  }
});

// =====================================================
// Delete media from Cloudinary
// =====================================================
router.delete("/delete-media", async (req, res) => {
  try {
    const { publicId, resourceType } = req.body;
    if (!publicId) {
      return res.status(400).json({ success: false, message: "No public ID provided" });
    }
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType || "image",
    });
    res.status(200).json({ success: true, result });
  } catch (error) {
    console.error("Media delete error:", error);
    res.status(500).json({ success: false, message: "Failed to delete media" });
  }
});

module.exports = router;
