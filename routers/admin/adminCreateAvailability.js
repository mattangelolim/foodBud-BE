const express = require("express");
const router = express.Router();
const FoodTasting = require("../../models/foodTasting");
const Event = require("../../models/Event");
const Meeting = require("../../models/onlineMeeting");

router.post("/occupied/date", async (req, res) => {
  try {
    const { date } = req.body;

    const invalidDateTime = await FoodTasting.findAll({
      where: {
        date: date,
      },
      attributes: ["date", "time"],
    });

    const invalidEventDate = await Event.findAll({
      where: {
        event_date: date,
      },
      attributes: ["event_date", "start_time"],
    });

    const invalidMeetingDate = await Meeting.findAll({
      where: {
        date: date,
      },
      attributes: ["date", "time"],
    });

    const convertToComparableTime = (timeString) => new Date(`1970-01-01T${timeString}`);

    const invalidTimeSlots = [
      ...invalidDateTime.map((item) => ({
        date: item.date,
        time: item.time,
        type: "Food Tasting",
      })),
      ...invalidEventDate.map((item) => ({
        date: item.event_date,
        time: item.start_time,
        type: "Event Day",
      })),
      ...invalidMeetingDate.map((item) => ({
        date: item.date,
        time: item.time,
        type: "Online Meeting",
      })),
    ];
    invalidTimeSlots.sort((a, b) => {
      const dateComparison = a.date.localeCompare(b.date);
      if (dateComparison !== 0) {
        return dateComparison;
      }
      return convertToComparableTime(a.time) - convertToComparableTime(b.time);
    });

    res.status(200).json({ invalidTimeSlots });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
