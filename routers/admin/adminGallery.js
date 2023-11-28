const express = require("express");
const router = express.Router();

router.get("/all/gallery", async (req, res) => {
  try {
    const AllPictures = await Dishes.findAll();

    res.status(200).json({ AllPictures });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
