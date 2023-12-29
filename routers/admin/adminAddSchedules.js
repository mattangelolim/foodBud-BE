const express = require('express');
const router = express.Router();
const AvailableDate = require("../../models/availableDate")

router.post("/add/date/time", async (req, res) => {
    try {
        const { date, time } = req.body;

        // Check if the time ends in 00 minutes
        const isEndsWith00 = time.endsWith('00');
        if (!isEndsWith00) {
            return res.status(400).json({ error: 'Invalid time. Only times ending in 00 minutes are allowed.' });
        }

        // Check the combination of date and time 
        const existingRecord = await AvailableDate.findOne({
            where: {
                date,
                time
            }
        });
        if (existingRecord) {
            return res.status(200).json({ message: 'Duplicate entry.' });
        }

        // Save the date and time
        const newAvailableDate = new AvailableDate({ date, time });
        await newAvailableDate.save();

        res.status(200).json({ message: 'Date and time added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/available/dates", async (req, res) => {
    try {
        // Find all dates where STATUS IS 1
        const availableDates = await AvailableDate.findAll({
            attributes: ['date'],
            where: {
                status: 1
            },
            raw: true
        });

        // Calculate the count for each unique date
        const dateCountMap = new Map();
        availableDates.forEach(entry => {
            const date = entry.date;
            dateCountMap.set(date, (dateCountMap.get(date) || 0) + 1);
        });

        // Format the result with distinct dates and their counts
        const result = Array.from(dateCountMap.entries()).map(([date, count]) => ({
            date,
            count
        }));

        res.status(200).json({ availableDates: result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get("/time/available", async (req, res) => {
    try {
        // Extract the date from the query parameters
        const { date } = req.query;

        if (!date) {
            return res.status(400).json({ error: 'Date parameter is required.' });
        }

        // Find all times where date is the specified date and status is 1 using Sequelize
        const availableTimes = await AvailableDate.findAll({
            attributes: ['time'],
            where: {
                date,
                status: 1
            },
            raw: true
        });

        const uniqueAvailableTimes = [...new Set(availableTimes.map(entry => entry.time))];

        res.status(200).json({ availableTimes: uniqueAvailableTimes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});


module.exports = router