const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");

router.get("/get/event", async (req, res) => {
  try {
    const event_id = req.query.event_id;

    const fetchEvent = await Event.findOne({
      where: {
        event_id: event_id,
      },
    });
    if (!fetchEvent) {
      res.status(400).json({ message: "invalid event!" });
    }
    res.status(200).json({ fetchEvent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: message.error });
  }
});
module.exports = router;
