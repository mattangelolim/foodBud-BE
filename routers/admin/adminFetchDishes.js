const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");
const {Op} = require("sequelize");
const sequelize = require("../../config/database");

router.get('/top/dishes', async (req, res) => {
    try {
        const startDate = req.query.startDate; 
        const endDate = req.query.endDate;  
    
        const today = new Date();
        const currentDateString = today.toISOString().split("T")[0];
        // Fetch all events
        const events = await Event.findAll({
            where: {
                createdAt: {
                  [Op.between]: [startDate || currentDateString, endDate || currentDateString],
                },
              },
        });

        // Calculate dish counts
        const dishCounts = {};

        events.forEach(event => {
            // Assuming the dishes are stored as separate columns (dish_1, dish_2, pasta, dessert)
            const dishes = ['dish_1', 'dish_2', 'pasta', 'dessert'];

            dishes.forEach(dish => {
                const dishName = event[dish];

                if (dishName) {
                    dishCounts[dishName] = (dishCounts[dishName] || 0) + 1;
                }
            });
        });

        // Convert dishCounts to an array of objects for sorting
        const dishRanking = Object.entries(dishCounts)
            .map(([dishName, count]) => ({ dishName, count }))
            .sort((a, b) => b.count - a.count);

        res.json(dishRanking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;


