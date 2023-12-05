const express = require("express");
const router = express.Router();
const OnlineMeeting = require("../../models/onlineMeeting")

router.post("/edit/meeting", async (req,res) =>{
    try {
        const event_id = req.query.event_id;
        const { date, time, notes } = req.body;

        const updateMeeting = await OnlineMeeting.update({
            date: date,
            time: time,
            notes: notes
        },{
            where:{
                event_Id: event_id
            }
        })

        if(updateMeeting === 0){
            return res.status(400).json({message: "Failed to edit meeting"})
        }

        res.status(200).json({message: "Meeting is SET", updateMeeting})

        
    } catch (error) {
        console.error(error)
        res.status(500).json({message: error.message})
    }
})
module.exports = router