const express = require("express");
const router = express.Router();
const PhotoCoverage = require("../../models/photoCoverage");

router.post("/upload/coverage", async (req, res) => {
  try {
    const { event_id, link, coverage_type } = req.body;

    // Check if the combination of event_id and coverage_type already exists
    const existingRecord = await PhotoCoverage.findOne({
      where: {
        event_id,
        coverage_type,
      },
    });

    if (existingRecord) {

      return res.status(200).json({ message: "Already existing" });
    }

    // If the combination does not exist, create a new record
    const uploadPhotoCoverage = await PhotoCoverage.create({
      event_id,
      link,
      coverage_type,
    });

    res.status(201).json(uploadPhotoCoverage); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
