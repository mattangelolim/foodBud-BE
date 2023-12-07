const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const Gallery = require("../../models/gallery");
const sequelize = require("../../config/database");

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

router.get("/sort/gallery", async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || "";
    let sort = req.query.sort || "createdAt";
    let galleryType = req.query.gallery || "All";
    let celebrantGender = req.query.celebrantGender || "All";
    let eventType = req.query.eventType || "All";

    const galleryTypes = [
      "Budget Package",
      "Deluxe Package",
      "Deluxe Debut Package",
      "Diamond Package",
      "Luxury Package",
      "Food",
      "Others",
    ];
    const genders = ["Male", "Female"];
    const eventTypes = [
      "Baptismal",
      "Kids Party",
      "Adult Party",
      "Debut",
      "Corporate",
    ];

    // Convert "All" to the full array for filtering
    galleryType === "All"
      ? (galleryType = galleryTypes)
      : (galleryType = req.query.gallery.split(","));
    celebrantGender === "All"
      ? (celebrantGender = genders)
      : (celebrantGender = req.query.celebrantGender.split(","));
    eventType === "All"
      ? (eventType = eventTypes)
      : (eventType = req.query.eventType.split(","));

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const images = await Gallery.findAll({
      attributes: [
        "package_type",
        "event_type",
        "theme",
        "celebrant_gender",
        "celebrant_age",
        "image",
      ],
      where: {
        package_type: galleryType,
        theme: { [Op.like]: `%${search}%` },
        celebrant_gender: celebrantGender,
        event_type: eventType,
      },
      order: [Object.entries(sortBy)],
      offset: page * limit,
      limit: limit,
    });

    const total = await Gallery.count({
      where: {
        package_type: galleryType,
        theme: { [Op.like]: `%${search}%` },
        celebrant_gender: celebrantGender,
        event_type: eventType,
      },
    });

    const response = {
      error: false,
      total,
      page: page + 1,
      limit,
      galleryTypes,
      genders,
      eventTypes,
      images,
    };

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
});

module.exports = router;
