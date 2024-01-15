const express = require("express");
const router = express.Router();
const Client = require("../../models/client");
const { Op } = require("sequelize")
// const AvailableDate = require("../../models/availableDate")

router.get("/count", async (req, res) => {
  try {
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    const today = new Date();
    const currentDateString = today.toISOString().split("T")[0];

    const numberOfClients = await Client.count({
      where: {
        createdAt: {
          [Op.between]: [startDate || currentDateString, endDate || currentDateString],
        },
      },
    });
    res.json({ numberOfClients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/clients", async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json({ clients });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

router.get("/client", async (req, res) => {
  try {
    const id = req.query.id;
    const client = await Client.findOne({
      where: {
        id: id,
      },
    });
    res.json({ client });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
