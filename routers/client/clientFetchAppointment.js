// Assuming you have Sequelize as ORM

const express = require("express");
const router = express.Router();
const FoodTasting = require("../../models/foodTasting");
const OnlineMeeting = require("../../models/onlineMeeting");
const Event = require("../../models/Event"); // Update the path accordingly

router.get("/appointments", async (req, res) => {
  try {
    const foodTastingAppointments = await FoodTasting.findAll({
      include: [{ model: Event }],
    });

    const onlineMeetingAppointments = await OnlineMeeting.findAll({
      include: [{ model: Event }],
    });

    const eventAppointments = await Event.findAll();

    const appointments = [];

    foodTastingAppointments.forEach((appointment) => {
      appointments.push({
        date: appointment.Event.date,
        description: appointment.description,
        service: "Food Tasting",
        status: appointment.status,
      });
    });

    onlineMeetingAppointments.forEach((appointment) => {
      appointments.push({
        date: appointment.Event.date,
        description: appointment.description,
        service: "Online Meeting",
        status: appointment.status,
      });
    });

    eventAppointments.forEach((appointment) => {
      appointments.push({
        date: appointment.date,
        description: appointment.description,
        service: "Event",
        status: appointment.status,
      });
    });

    res.json({ appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get all appointments
router.get("/show/appointments", async (req, res) => {
  try {
    const foodTastingAppointments = await FoodTasting.findAll({
      include: [{ model: Event }],
    });

    const onlineMeetingAppointments = await OnlineMeeting.findAll({
      include: [{ model: Event }],
    });

    // Combine the results
    const allAppointments = [
      ...foodTastingAppointments,
      ...onlineMeetingAppointments,
    ];

    res.json({ allAppointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
