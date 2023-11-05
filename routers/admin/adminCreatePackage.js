const express = require("express");
const router = express.Router();
const Package = require("../../models/Package");
const Headcount = require("../../models/Headcount");
const Client = require("../../models/Client");

router.post("/package/create", async (req, res) => {
  try {
    const {
      package_type,
      headcount_id,
      event_id,
      client_email,
      hc_kids,
      hc_adults,
    } = req.body;

    const foundClient = await Client.findOne({
      where: {
        client_email: client_email,
      },
    });

    if (!foundClient) {
      return res.status(400).json({
        message: "Invalid Email! No client found",
      });
    }

    // Create a package for Client
    const newPackage = await Package.create({
      package_type,
      headcount_id,
      event_id,
      client_email,
    });

    const newHeadCount = await Headcount.create({
      headcount_id,
      hc_kids,
      hc_adults,
    });

    res
      .status(201)
      .json({ message: "Package created successfully", package: newPackage, headcount: newHeadCount });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
