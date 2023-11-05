const express = require("express");
const router = express.Router();
const Client = require("../../models/Client");

router.post("/user/register", async (req, res) => {
  try {
    const { client_name, client_address, client_contact, client_email } = req.body;

    // Create a new client
    const newClient = await Client.create({
      client_name,
      client_address,
      client_contact,
      client_email,
    });

    res.status(201).json({ message: "Client registered successfully", client: newClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
