const express = require("express");
const router = express.Router();
const AvailableDate = require("../../models/availableDate");
const foodTasting = require("../../models/foodTasting");

router.get("/available/date", async (req, res) => {
    try {
        const availableTimes = await AvailableDate.findAll({
            attributes: ['time'] 
        });

        const timesArray = availableTimes.map(time => time.time); // Extract 'time' values

        // console.log(timesArray); // Log the array of times

        const invalidDateTime = await foodTasting.findAll({
            attributes:['date', 'time']
        })

        const occupiedDateTime = invalidDateTime.filter(item => timesArray.includes(item.time));

        res.json(occupiedDateTime);

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }


})

module.exports = router