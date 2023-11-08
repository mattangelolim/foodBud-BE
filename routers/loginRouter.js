const express = require("express");
const router = express.Router();
const Client = require("../models/client");

router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const loginUser = await Client.findOne({
      where: {
        client_name: username,
        client_contact: password,
      },
    });

    //   console.log(loginUser)
    if (!loginUser) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    res.status(200).json({
      message: "login successfully",
      loginUser
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;
