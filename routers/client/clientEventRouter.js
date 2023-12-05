const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const themeColor = require("../../models/themeColor");

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
    const fetchEvent = await Event.findAll({
      order: [['event_id', 'DESC']],
    }); 


    // console.log(fetchEvent)

    const eventIds = fetchEvent.map(event => (event.dataValues.event_id))

    console.log(eventIds)
    const packages = await Package.findAll({
      where: { event_id: eventIds },
      attributes: ['event_id', 'client_email'],

    });

    // Combine event and package data
    const eventDataWithClientEmail = fetchEvent.map((event) => {
      const matchingPackage = packages.find((pkg) => pkg.event_id === event.dataValues.event_id);
      return {
        ...event.dataValues,
        client_email: matchingPackage ? matchingPackage.client_email : null,
      };
    });

    res.status(200).json({ events: eventDataWithClientEmail });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
