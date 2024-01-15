const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const sequelize = require("../../config/database");
const {Op} =require("sequelize")

router.get("/top/packages", async (req, res) => {
  try {
    const startDate = req.query.startDate; 
    const endDate = req.query.endDate;  

    const today = new Date();
    const currentDateString = today.toISOString().split("T")[0];

    const packageCounts = await Package.findAll({
      where: {
        createdAt: {
          [Op.between]: [startDate || currentDateString, endDate || currentDateString],
        },
      },
      attributes: [
        "package_type", // Assuming this is the name of the package field
        [sequelize.fn("COUNT", sequelize.col("package_type")), "count"],
      ],
      group: ["package_type"],
    });

    res.json(packageCounts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
