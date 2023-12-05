const express = require("express");
const router = express.Router();
const fb_info = require("../../models/fb_info");

// Retrieve all information
router.get("/all/fb_info", async (req, res) => {
    try {
      const infoList = await fb_info.findAll(); // Use fb_info instead of Info
  
      res.status(200).json({ fb_info: infoList }); // Adjust the response
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  router.get("/all/fb_info/:info_id", async (req, res) => {
      const { info_id } = req.params;
    
      try {
        const info = await fb_info.findOne({ // Use fb_info instead of Info
          where: { info_id },
        });
    
        if (!info) {
          return res.status(404).json({ error: "Information not found" });
        }
    
        res.status(200).json({ info });
  
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      }
  });
  

// Add information
router.post("/add/info", async (req, res) => {
    const { info_id, contactnum, email, address } = req.body;
    
    try {
        const newInfo = await fb_info.create({ // Use fb_info instead of Info
        info_id,
        contactnum,
        email,
        address
        });
    
        res.status(200).json({
        message: "Information added successfully!",
        info: newInfo // Adjust the response
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Update an existing id
router.put("/update/fb_info/:info_id", async (req, res) => {
    const { info_id } = req.params;
    const { contactnum, email, address } = req.body;
  
    try {
      const infoToUpdate = await fb_info.findOne({ where: { info_id } });
  
      if (!infoToUpdate) {
        return res.status(404).json({ error: "Information not found" });
      }
  
      // Ensure infoToUpdate is an instance of fb_info model
      if (infoToUpdate instanceof fb_info) {
        // Update the fields
        await infoToUpdate.update({
          contactnum, 
          email, 
          address
        });
  
        res.status(200).json({ message: "Information updated successfully!" });
      } else {
        return res.status(500).json({ error: "Internal Server Error - Invalid Data Type" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  
// Delete information route
router.delete("/delete/fb_info/:info_id", async (req, res) => {
    const { info_id } = req.params;
  
    try {
      const infoToDelete = await fb_info.findOne({ where: { info_id } }); // Use fb_info instead of Info
  
      if (!infoToDelete) {
        return res.status(404).json({ error: "Information not found" });
      }
  
      await infoToDelete.destroy();
  
      res.status(200).json({ message: "Information deleted successfully" });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

module.exports = router;