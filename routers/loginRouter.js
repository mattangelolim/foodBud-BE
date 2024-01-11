const express = require("express");
const router = express.Router();
const Userlogin = require("../models/userlogin");
const Client = require("../models/Client");

router.post("/user/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const loginUserCreds = await Userlogin.findOne({
      where: {
        username: username,
        userpass: password,
      },
    });

    if (!loginUserCreds) {
      return res.status(400).json({
        message: "No user found",
      });
    }

    const loginUser = await Client.findOne({
      where: {
        client_name: username,
      },
    });

    res.status(200).json({
      message: "login successfully",
      loginUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
});

router.get("/get/profile", async (req,res) =>{
  try {
    const email = req.query.email

    const ClientProfile = await Client.findOne({
      where:{
        client_email:email
      }
    })

    res.status(200).json({ClientProfile})
  } catch (error) {
    console.error(error)
    res.status(500).json({message: "Internal Server Error"})
  }
})

module.exports = router;
