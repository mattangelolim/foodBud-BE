const express = require("express");
const router = express.Router();
const FoodTasting = require("../../models/foodTasting");

router.get("/get/FT", async (req, res) => {
    try {
      const event_id = req.query.event_id;
  
      const fetchFT = await FoodTasting.findOne({
        where: {
          event_id: event_id,
        },
      });
      if (!fetchFT) {
        return res.status(400).json({ message: "invalid event!" });
      }

  
      res.status(200).json({ fetchFT });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;