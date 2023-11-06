const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const Event = require("../../models/Event");

router.get("/client/events", async (req, res) => {
  try {
    const { client_email } = req.query;

    const packageEvents = await Package.findAll({
      where: {
        client_email: client_email
      },
    });

    if (packageEvents.length === 0) {
      return res
        .status(400)
        .json({ message: "No package found with this email" });

        
    }

    // NOT WORKING PROPERLY NOW
    // console.log(packageEvents.dataValues)


    // const foundEvents = await Event.findAll({
    //   where: {
    //     event_id: packageEvents.package.event_id
    //   },
    // });

    // const responseEvents = {
    //   celebrant: foundEvents.celebrant_name,
    //   event_date: foundEvents.event_date,
    //   event_type: foundEvents.event_type,
    // };

    res
      .status(200)
      .json({ message: "Events Found!", events: packageEvents });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
