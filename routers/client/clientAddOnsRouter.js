const express = require("express");
const router = express.Router();
const Additionals = require("../../models/additional");
const AddonsMenu = require("../../models/addonMenu");

router.post("/additional/food", async (req, res) => {
  try {
    const { event_id, addons } = req.body;

    const findAddon = await AddonsMenu.findOne({
      where: {
        addons_name: addons,
      },
    });

    if (!findAddon) {
      return res.status(400).json({ message: "Can't find that addons" });
    }

    const Additional = await Additionals.create({
      event_Id: event_id,
      addons_name: addons,
    });

    console.log(Additional);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
