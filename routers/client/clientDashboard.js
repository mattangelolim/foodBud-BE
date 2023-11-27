const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");
const Package = require("../../models/Package");
const Headcount = require("../../models/Headcount");

router.get("/get/event/id", async (req, res) => {
  try {
    const client_email = req.query.client_email;

    const eventDets = await Package.findAll({
      where: {
        client_email: client_email,
      },
    });

    res.json(eventDets);
  } catch (error) {
    console.error(error);
  }
});

router.get("/event/dashboard", async (req, res) => {
  try {
    const eventID = req.query.eventID;

    const PackageFound = await Package.findOne({
      where: {
        event_id: eventID,
      },
    });

    if (!PackageFound) {
      return res.status(404).json({ error: "Package not found" });
    }

    // Extracting headcount_id from PackageFound
    const headcountID = PackageFound.headcount_id;

    // Fetching Headcount details
    const headCountDets = await Headcount.findOne({
      where: {
        headcount_id: headcountID,
      },
    });

    const eventDetail = await Event.findOne({
      where: {
        event_id: eventID,
      },
    });

    if (!eventDetail) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Extracting specific fields
    const responseData = {
      package_type: eventDetail.package_type,
      event_id: eventDetail.event_id,
      celebrant_name: eventDetail.celebrant_name,
      event_date: eventDetail.event_date,
      event_type: eventDetail.event_type,
      theme: eventDetail.theme,
      hc_kids: headCountDets ? headCountDets.hc_kids : null,
      hc_adults: headCountDets ? headCountDets.hc_adults : null,
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
