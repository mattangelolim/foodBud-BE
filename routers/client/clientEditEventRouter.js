const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");

// AFTER CREATING MODEL, REQUIRE THE SPECIFIC MODEL YOU CREATED HERE
const Dishes = require("../../models/dishes")


router.post("/edit/event", async (req, res) => {
  try {
    const {
      celebrant_name,
      celebrant_age,
      event_date,
      prep_time,
      start_time,
      event_type,
      theme,
      color_theme,
      venue_time,
      venue_type,
      venue_floor,
      venue_address,
      venue_location,
      dish_1,
      dish_2,
      pasta,
      dessert,
    } = req.body;

    const event_id = req.query.event_id;

    const foundEvent = await Event.findOne({
      where: {
        event_id: event_id,
      },
    });

    console.log(foundEvent);

    if (!foundEvent) {
      return res
        .status(400)
        .json({ message: "Can't find event with the provided id" });
    }

    // Make an object to know what to update
    const updateObject = {};

    for (const [key, value] of Object.entries(req.body)) {
      if (value) {
        updateObject[key] = value;
      }
    }

    const updateEvent = await Event.update(
      {
        ...updateObject,
      },
      {
        where: {
          event_id: event_id,
        },
      }
    );

    if (updateEvent[0] === 0) {
      return res.status(400).json({ message: "No event Found" });
    }

    res
      .status(200)
      .json({ message: "Event updated successfully", updateEvent });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
module.exports = router;
