
const express = require("express");
const router = express.Router();
const FoodTasting = require("../../models/foodTasting");
const OnlineMeeting = require("../../models/onlineMeeting");
const Event = require("../../models/Event"); 
const Package = require("../../models/Package");

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
    const email = req.query.email;

    const findEventId = await Package.findAll({
      where: {
        client_email: email
      },
      attributes: ['event_id']
    });

    const mappedEventIds = findEventId.map(item => item.event_id);

    const findEvent = await Event.findAll({
      where: {
        event_id: mappedEventIds
      },
      attributes: ['event_id', 'event_type', 'package_type', 'event_date', 'start_time']
    });

    const findMeeting = await OnlineMeeting.findAll({
      where: {
        event_id: mappedEventIds
      },
      attributes: ['event_Id', 'date', 'time', 'notes']
    });

    const findFoodTasting = await FoodTasting.findAll({
      where: {
        event_id: mappedEventIds
      },
      attributes: ['event_Id', 'date', 'time', 'contact', 'name']
    });

    // Combine information from findEvent and findMeeting
    const response = mappedEventIds.map(eventId => {
      const eventInfo = findEvent.find(event => event.event_id === eventId);

      return {
        datetime: (eventInfo ? `${eventInfo.event_date} ${eventInfo.start_time}` : ''),
        description: (eventInfo ? eventInfo.event_type : ''),
        service: (eventInfo ? 'Event' : '') 
      };
    });

    const response2 = mappedEventIds.map(eventId => {
      const meetingInfo = findMeeting.find(meeting => meeting.event_Id === eventId);
      return {
        datetime: (meetingInfo ? `${meetingInfo.date} ${meetingInfo.time}` : ''),
        description: (meetingInfo ? meetingInfo.notes : ''),
        service: (meetingInfo ? 'Online Meeting' : '')
      };
    });

    const response3 = mappedEventIds.map(eventId => {
      const foodTastingInfo = findFoodTasting.find(foodtasting => foodtasting.event_Id === eventId);
      return {
        datetime: (foodTastingInfo ? `${foodTastingInfo.date} ${foodTastingInfo.time}` : ''),
        description: (foodTastingInfo ? `Please contact ${foodTastingInfo.name} ` : ''),
        service: (foodTastingInfo ? 'Food Tasting' : '')
      };
    });

    const combinedResponses = [...response, ...response2, ...response3];

    // Sort the combined responses by datetime
    const sortedAppointments = combinedResponses.sort((a, b) => {
      const dateA = new Date(a.datetime).getTime();
      const dateB = new Date(b.datetime).getTime();
      return dateA - dateB;
    });

    res.status(200).json({ appointments: sortedAppointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
