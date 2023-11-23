const express = require("express");
const router = express.Router();
const OnlineMeeting = require("../../models/onlineMeeting")

router.get("/online/meeting", async (req, res) => {

    try {
        const event_id = req.query.event_id

        const FetchMeeting = await OnlineMeeting.findOne({
            where: {
                event_id: event_id
            }
        })

        if (!FetchMeeting) {
            return res.status(400).json({ message: "No meeting found! " })
        }

        res.status(200).json({ FetchMeeting })


    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }

})

module.exports = router