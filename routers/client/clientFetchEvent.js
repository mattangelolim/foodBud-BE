const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");
const Additional = require("../../models/additional")

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

    const newAdds = await Additional.findAll({
      where:{
        event_Id:event_id
      }
    })

    console.log(newAdds)

    const response = newAdds.addons_name

    console.log(response)


    res.status(200).json({ fetchEvent, newAdds });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
