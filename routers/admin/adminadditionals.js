// addonRoutes.js

const express = require("express");
const router = express.Router();
const addon_menu = require("../../models/addonMenu"); // Update with your actual model names

// Route to get all additional services
router.get("/all/addons", async (req, res) => {
  try {
    const AddonMenu = await addon_menu.findAll();

    res.json(AddonMenu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to add a new additional service
router.post("/add/addon", async (req, res) => {
  try {
    const newService = await addon_menu.create(req.body);
    res.json(newService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to update an additional service by ID
router.put("/update/addon/:id", async (req, res) => {
  try {
    const updatedService = await addon_menu.update(req.body, {
      where: { id: req.params.id },
    });
    res.json(updatedService);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to delete an additional service by ID
router.delete("/delete/addon/:id", async (req, res) => {
  try {
    await addon_menu.destroy({ where: { id: req.params.id } });
    res.json({ message: "Service deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to get add-ons services by type
router.get("/by/:addons_type", async (req, res) => {
  try {
    const addons = await addon_menu.findAll({
      where: { addons_type: req.params.type },
    });
    res.json(addons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/addons/tie-up", async (req, res) => {
  try {
    const tieUpAddons = await AddonMenu.findAll({
      where: { addon_type: "Tie-Up" },
    });

    res.json(tieUpAddons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
