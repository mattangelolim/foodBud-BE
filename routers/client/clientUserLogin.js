const express = require("express");
const router = express.Router();
const User = require("../../models/userlogin");

// Retrieve all users
router.get("/all/users", async (req, res) => {
  try {
    const users = await User.findAll();

    res.status(200).json({ users });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/all/users/:client_id", async (req, res) => {
    const { client_id } = req.params;
  
    try {
      const user = await User.findOne({
        where: { client_id },
        attributes: { exclude: ['userpass'] }, // Exclude password field from the result
      });
  
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
  
      res.status(200).json({ user });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
    });

// Add a user
router.post("/add/user", async (req, res) => {
    const { username, userpass, client_id } = req.body;
    
    try {
        const newUser = await User.create({
        username,
        userpass,
        client_id,
        });
    
        res.status(200).json({
        message: "User added successfully!",
        user: newUser // Optionally, you can send back the created user for confirmation
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
    });

// Update an existing user
router.put("/update/user/:client_id", async (req, res) => {
    const { client_id } = req.params;
    const { username, userpass } = req.body;
  
    try {
      const userToUpdate = await User.findOne({ where: { client_id } });
  
      if (!userToUpdate) {
        return res.status(404).json({ error: "User not found" });
      }
  
      await userToUpdate.update({
        username,
        userpass,
      });
  
      res.status(200).json({ message: "User updated successfully!" });

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
// Delete user route
router.delete("/delete/user/:client_id", async (req, res) => {
  const { client_id } = req.params;

  try {
    const userToDelete = await User.findOne({ where: { client_id } });

    if (!userToDelete) {
      return res.status(404).json({ error: "User not found" });
    }

    await userToDelete.destroy();

    res.status(200).json({ message: "User deleted successfully" });

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });

  }
});

module.exports = router;
