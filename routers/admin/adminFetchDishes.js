// const express = require("express");
// const router = express.Router();
// const Event = require("../../models/Event");
// const Op = require("sequelize");
// const sequelize = require("../../config/database");

// router.get("/top/dishes", async (req, res) => {
//   try {
//     const topDishesQuery = `
//     SELECT dish_name, COUNT(*) as total_count
//     FROM (
//       SELECT dish_2 as dish_name FROM events WHERE dish_2 IS NOT NULL
//       UNION ALL
//       SELECT dish_1 as dish_name FROM events WHERE dish_1 IS NOT NULL
//     ) as combined_dishes
//     GROUP BY dish_name
//     ORDER BY total_count DESC
//     LIMIT 5;
//       `;

//     const [topDishes, metadata] = await sequelize.query(topDishesQuery, {
//       type: sequelize.QueryTypes.SELECT,
//     });

//     res.json(topDishes);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Event = require("../../models/Event");
const Op = require("sequelize");
const sequelize = require("../../config/database");

router.get('/top/dishes', async (req, res) => {
    try {
        // Fetch all events
        const events = await Event.findAll();

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


