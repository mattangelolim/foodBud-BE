const express = require("express");
const router = express.Router();
const OnlineMeeting = require("../../models/onlineMeeting");

router.get("/meeting/events", async (req, res) => {
  try {
    const fetchMeetings = await OnlineMeeting.findAll();

    console.log(fetchMeetings)


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
