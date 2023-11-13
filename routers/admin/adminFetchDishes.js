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
