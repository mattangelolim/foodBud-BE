const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const Event = require("../../models/Event");

router.get("/client/events", async (req, res) => {
  try {
    const { client_email } = req.query;

    const packageEvents = await Package.findAll({
      where: {
        client_email: client_email,
      },
    });

    if (packageEvents.length === 0) {
      return res
        .status(400)
        .json({ message: "No package found with this email" });
    }

    // NOT WORKING PROPERLY NOW
    const eventIds = packageEvents.map(packageEvent => packageEvent.event_id);

    const foundEvents = await Event.findAll({
      where: {
        event_id: eventIds
      },
    });

    const responseEvents = foundEvents.map(event => {
      const matchingPackage = packageEvents.find(packageEvent => packageEvent.event_id === event.event_id);
      return {
        eventID: event.event_id,
        celebrant: event.celebrant_name,
        event_date: event.event_date,
        event_type: event.event_type,
        package_type: matchingPackage.package_type 
      };
    });

    res.status(200).json({ message: "Events Found!", events: responseEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }

  
});

router.get("/get/event/all", async (req, res) => {
  try {
    const fetchEvent = await Event.findAll(); 

    if (!fetchEvent || fetchEvent.length === 0) {
      return res.status(400).json({ message: "No events found!" });
    }

    res.status(200).json({ events: fetchEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
