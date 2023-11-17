const express = require("express");
const router = express.Router();
const Client = require("../../models/client");

router.get("/count", async (req, res) => {
  try {
    const numberOfClients = await Client.count();
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

module.exports = router;