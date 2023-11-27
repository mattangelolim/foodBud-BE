const express = require("express");
const router = express.Router();
// const Event = require("../../models/Event")
const Package = require("../../models/Package");

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

module.exports = router;
