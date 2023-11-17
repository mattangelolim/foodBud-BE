const express = require("express");
const router = express.Router();
const FoodTasting = require("../../models/foodTasting");
const Event = require("../../models/Event");

router.get("/foodtasting/data", async (req, res) => {
  try {
    // Fetch all FoodTasting data
    const allFoodTasting = await FoodTasting.findAll({
      order: [['event_id', 'DESC']]
    });



    // Extract unique event IDs
    const eventIds = allFoodTasting.map(
      (tasting) => tasting.dataValues.event_Id
    );
    // console.log(eventIds)

    // Fetch dishes from Event model for each event ID

    const eventDishes = await Event.findAll({
      where: { event_id: eventIds },
      attributes: ["dish_1", "dish_2", "pasta", "dessert", "event_id"],
      order: [['event_id', 'DESC']]
    });

    // const dishID = eventDishes.map((event) => event.dataValues.event_id)
    // console.log(dishID)

    const combinedData = allFoodTasting.map((tasting) => {
        const matchingDish = eventDishes.find((dish) => dish.event_id === tasting.dataValues.event_Id);

        return {
            ...tasting.dataValues,
            dishes: matchingDish
        };
    });

    res.json(combinedData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/foodtasting/data-get", async (req, res) => {
    const eventId = req.query.eventId;
  
    try {
      const specificEventData = await FoodTasting.findAll({
        where: { event_Id: eventId },
      });
  
      const specificEventDishes = await Event.findAll({
        where: { event_id: eventId },
        attributes: ["dish_1", "dish_2", "pasta", "dessert", "event_id"],
      });
  
      const combinedData = specificEventData.map((tasting) => {
        const matchingDish = specificEventDishes.find(
          (dish) => dish.event_id === tasting.dataValues.event_Id
        );
  
        return {
          ...tasting.dataValues,
          dishes: matchingDish,
        };
      });
  
      res.json(combinedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
