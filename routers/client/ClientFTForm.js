const express = require("express");
const router = express.Router();
const FoodTasting = require("../../models/foodTasting");
const AvailableDate = require("../../models/availableDate")
const { Op } = require("sequelize")
const moment = require('moment');

router.post("/food/tasting", async (req, res) => {
  try {
    const event_id = req.query.event_id;
    const { date, time, name, dish, contact, address, google_pin } = req.body;
    const dateTime = moment(`${date} ${time}`);

    // Ensure the parsed date and time are valid
    if (!dateTime.isValid()) {
      return res.status(400).json({ message: 'Invalid date or time.' });
    }
    const nextHour = dateTime.clone().add(1, 'hour');
    
    // Format "HH:mm:ss"
    const nextHourFormatted = nextHour.format('HH:mm:ss');

    // Update the status for the input hour and the next hour to 0
    await AvailableDate.update(
      { status: 0 },
      {
        where: {
          date: date,
          time: {
            [Op.between]: [time, nextHourFormatted],
          },
        },
      }
    );
    // console.log('date:', date);
    // console.log('time:', time);
    // console.log('nextHour:', nextHour);


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
    if (UpdatedFT === 0) {
      return res.status(400).json({ message: "Failed to update Food tasting" });
    }

    res
      .status(200)
      .json({ message: "Successfully updated foodtasting", UpdatedFT });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
