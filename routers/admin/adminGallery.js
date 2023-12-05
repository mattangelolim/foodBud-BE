const express = require("express");
const router = express.Router();
const Gallery = require("../../models/gallery");

//  All Images
router.get("/all/gallery", async (req, res) => {
  try {
    const AllPictures = await Gallery.findAll();

    res.status(200).json({ AllPictures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Add Image
router.post("/add/gallery", async (req, res) => {
  try {
    const { package_type, event_type, theme, celebrant_gender, celebrant_age } =
      req.body;

    // Create a new client
    const newPicture = await Gallery.create(req.body);

    res.status(201).json({
      message: "Picture Added successfully",
      gallery: newPicture,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/delete/gallery", async (req, res) => {
  try {
    const galleryId = req.query.galleryId;

    // Check if the package with the provided ID exists
    const existingImage = await Gallery.findByPk(galleryId);

    if (!existingImage) {
      return res.status(404).json({ message: "Image not found" });
    }

    // If the package exists, proceed with deletion
    await Gallery.destroy({
      where: {
        gallery_id: galleryId,
      },
    });

    res.status(200).json({ message: "Image Destroyed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
