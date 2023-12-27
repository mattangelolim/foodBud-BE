const express = require("express");
const router = express.Router();
const OnlineMeeting = require("../../models/onlineMeeting")
const AvailableDate = require("../../models/availableDate")
const moment = require("moment")
const {Op} = require("sequelize")

router.post("/edit/meeting", async (req,res) =>{
    try {
        const event_id = req.query.event_id;
        const { date, time, notes } = req.body;
        const dateTime = moment(`${date} ${time}`);

        // Ensure the parsed date and time are valid
        if (!dateTime.isValid()) {
          return res.status(400).json({ message: 'Invalid date or time.' });
        }
        const nextHour = dateTime.clone().add(1, 'hour');
        
        // Format "HH:mm:ss"
        const nextHourFormatted = nextHour.format('HH:mm:ss');
    
        // Update the status for the input hour and the next hour to 0
        await AvailableDate.update(
          { status: 0 },
          {
            where: {
              date: date,
              time: {
                [Op.between]: [time, nextHourFormatted],
              },
            },
          }
        );

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