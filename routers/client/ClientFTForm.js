const express = require("express");
const router = express.Router();
const FoodTasting = require("../../models/foodTasting");

router.post("/food/tasting", async (req, res) => {
  try {
    const event_id = req.query.event_id;
    const { date, time, name, dish, contact, address, google_pin,  } = req.body;

    const UpdatedFT = await FoodTasting.update(
        {
          date: date,
          name: name,
          dish: dish,
          contact: contact,
          address: address,
          google_pin: google_pin,
          time: time,
        },
        {
          where: {
            event_Id: event_id,
          },
        }
      );
      if(UpdatedFT === 0){
        return res.status(400).json({message: "Failed to update Food tasting"})
      }

      res.status(200).json({message: "Successfully updated foodtasting", UpdatedFT})
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
