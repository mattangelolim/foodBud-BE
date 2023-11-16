const express = require("express");
const router = express.Router();
const Client = require("../../models/client");

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

router.post("/user/update", async (req, res) => {
  const clientId = req.query.id;

  try {
    // Find the client by ID
    const existingClient = await Client.findByPk(clientId);

    if (!existingClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Update client details
    existingClient.client_name = req.body.client_name || existingClient.client_name;
    existingClient.client_address = req.body.client_address || existingClient.client_address;
    existingClient.client_contact = req.body.client_contact || existingClient.client_contact;
    existingClient.client_email = req.body.client_email || existingClient.client_email;

    // Save the updated client
    const updatedClient = await existingClient.save();

    res.json({ message: "Client details updated successfully", client: updatedClient });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
