const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const Headcount = require("../../models/Headcount");
const Client = require("../../models/client");
const Event = require("../../models/Event");
const Id = require("../../models/ids");
const Apppointment = require("../../models/appointment");
const Meeting = require("../../models/onlineMeeting");
const FoodTasting = require("../../models/foodTasting");

// HELPER FUNCTION TO UPDATE IDS OF EVENT AND HEADCOUNT PER PACKAGE CREATION
const updateIds = async (headcount_id, event_id) => {
  try {
    const updatedIds = await Id.update(
      {
        headcount_id: headcount_id,
        event_id: event_id,
      },
      {
        where: {
          id: 1,
        },
      }
    );
    return updatedIds;
  } catch (error) {
    throw error;
  }
};

router.post("/package/create", async (req, res) => {
  try {
    const {
      package_type,
      client_email,
      hc_kids,
      hc_adults,
      celebrant_name,
      event_date,
      event_type,
    } = req.body;

    const foundClient = await Client.findOne({
      where: {
        client_email: client_email,
      },
    });

    if (!foundClient) {
      return res.status(400).json({
        message: "Invalid Email! No client found",
      });
    }

    const foundId = await Id.findOne({
      where: {
        id: 1,
      },
    });
    console.log(foundId);

    if (!foundId) {
      return res.status(400).json({
        message: "No record found in the ids table with id = 1",
      });
    }

    // console.log(foundId.headcount_id);
    // console.log(foundId.event_id);

    const headcount_id = foundId.headcount_id;
    const event_id = foundId.event_id;
    // Create a package for Client
    const newPackage = await Package.create({
      package_type,
      headcount_id,
      event_id,
      client_email,
    });

    // add an event to be modify by client
    const newEvent = await Event.create({
      event_id,
      package_type: package_type,
      celebrant_name,
      event_date,
      event_type,
    });

    console.log(event_id);

    // After creating package set the headcount
    const newHeadCount = await Headcount.create({
      headcount_id,
      hc_kids,
      hc_adults,
    });

    const newAppointment = await Apppointment.create({
      event_Id: event_id,
    });

    const newMeeting = await Meeting.create({
      event_Id: event_id,
    });

    const newFoodTasting = await FoodTasting.create({
      event_Id: event_id,
    });

    if (!newEvent) {
      return res.status(400).json({
        message: "Unable to add new event",
      });
    }

    // INCREMENT 1 EVERY PACKAGE CREATED FOR ID HEADCOUNT AND EVENT
    const updatedHeadCountId = headcount_id + 1;
    const updatedEventId = event_id + 1;

    // USE THE HELP FUNCTION TO UPDATE
    const updatedIds = await updateIds(updatedHeadCountId, updatedEventId);

    res.status(201).json({
      message: "Package created successfully",
      package: newPackage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
