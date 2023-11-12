const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const sequelize = require("../../config/database");

router.get("/top/packages", async (req, res) => {
  try {
    const packageCounts = await Package.findAll({
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
