const express = require("express");
const router = express.Router();
const OnlineMeeting = require("../../models/onlineMeeting");
const Package = require("../../models/Package")

router.get("/meeting/events", async (req, res) => {
  try {
    const fetchMeetings = await OnlineMeeting.findAll();


    const eventIds = fetchMeetings.map(
      (meetings) => meetings.dataValues.event_Id
    );

    // console.log(eventIds)

    const emails = await Package.findAll({
      where: { event_id: eventIds },
      attributes: ["event_id", "client_email"],
    });

    console.log("Emails:", emails);

    const combinedData = fetchMeetings.map((meetings) => {
      const matchId = emails.find((email) => email.event_id === meetings.dataValues.event_Id);
      // console.log(matchId)

      return {
          ...meetings.dataValues,
          email: matchId ? matchId.client_email : null,
      };
  });



    res.json(combinedData)


  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/meeting/update", async (req, res) => {
  try {
    const id = req.query.id
    const meeting_link = req.body.meeting_link
    const fetchMeetings = await OnlineMeeting.findOne({
      where:{
        id:id
      }
    });

    if (!fetchMeetings) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Update the meeting link
    await fetchMeetings.update({
      meeting_link: meeting_link
    });

    console.log('Meeting link updated:', meeting_link);

    res.json({ message: 'Meeting link updated successfully' });
  } catch (error) {
    console.error('Error updating meeting link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/meeting/specific", async (req, res) => {
  try {
    const id = req.query.id
    const fetchMeetings = await OnlineMeeting.findOne({
      where:{
        id:id
      }
    });

    if (!fetchMeetings) {
      return res.status(404).json({ error: 'Meeting not found' });
    }

    // Update the meeting link

    res.json({ fetchMeetings });
  } catch (error) {
    console.error('Error updating meeting link:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


module.exports = router;
