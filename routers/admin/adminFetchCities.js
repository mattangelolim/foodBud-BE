// cityRouter.js

const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");
const Client = require("../../models/client");
const {Op} = require("sequelize")

// Define the API endpoint to get city counts
router.get("/cities", async (req, res) => {
  try {
    const startDate = req.query.startDate; 
    const endDate = req.query.endDate;  

    const today = new Date();
    const currentDateString = today.toISOString().split("T")[0];
    // Use Sequelize's `count` function to get counts for each city
    const cityCounts = await Client.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate || currentDateString, endDate || currentDateString],
        },
      },
      attributes: [
        "client_address",
        [Sequelize.fn("COUNT", "client_address"), "count"],
      ],
      group: ["client_address"],
    });

    res.json(cityCounts);
  } catch (error) {
    console.error("Error fetching city counts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
