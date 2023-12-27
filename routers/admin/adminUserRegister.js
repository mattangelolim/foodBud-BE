const express = require("express");
const router = express.Router();
const Client = require("../../models/client");
const nodemailer = require("nodemailer");
const Userlogin = require("../../models/userlogin");
const crypto = require("crypto");

function generateUniqueToken() {
  return crypto.randomBytes(20).toString("hex");
}

router.post("/user/register", async (req, res) => {
  try {
    const { client_name, client_address, client_contact, client_email } =
      req.body;

    // Create a new client
    const newClient = await Client.create({
      client_name,
      client_address,
      client_contact,
      client_email,
    });

    const registerLogin = await Userlogin.create({
      username: client_name,
      userpass: client_contact,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "foodbud4@gmail.com", // Your email address
        pass: "rajt zlul xrjx zani", // Your email password
      },
    });

    const mailOptions = {
      from: "foodbud4@gmail.com",
      to: client_email,
      subject: "Registration Successful",
      text: `Dear ${client_name},\n\nThank you for registering!\n\nDetails:\nName: ${client_name}\nAddress: ${client_address}\nContact: ${client_contact}\nEmail: ${client_email}\n\nPlease use your contact number as your password to the website, but you can change it anytime using our change password feature.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        res.status(201).json({
          message: "Client registered successfully",
          client: newClient,
        });
      }
    });
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
    existingClient.client_name =
      req.body.client_name || existingClient.client_name;
    existingClient.client_address =
      req.body.client_address || existingClient.client_address;
    existingClient.client_contact =
      req.body.client_contact || existingClient.client_contact;
    existingClient.client_email =
      req.body.client_email || existingClient.client_email;

    // Save the updated client
    const updatedClient = await existingClient.save();

    res.json({
      message: "Client details updated successfully",
      client: updatedClient,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/forgot", async (req, res) => {
  const clientEmail = req.query.email;

  try {
    // Find the client by email
    const existingClient = await Client.findOne({
      where: { client_email: clientEmail },
    });

    if (!existingClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Generate a unique token for password reset
    const resetToken = generateUniqueToken();

    const userLogin = await Userlogin.findOne({
      where: {
        username: existingClient.client_name,
      },
    });

    // Save the reset token in the database
    userLogin.client_id = resetToken;
    const updatedClient = await userLogin.save();

    // Send password reset email
    const resetLink = `https://foodbud-fe.vercel.app/changePassword?token=${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "foodbud4@gmail.com",
        pass: "rajt zlul xrjx zani",
      },
    });

    const mailOptions = {
      from: "foodbud4@gmail.com",
      to: clientEmail,
      subject: "Password Reset Request",
      text: `Dear ${existingClient.client_name},\n\nYou have requested a password reset. Click the following link to reset your password:\n${resetLink}\n\nIf you did not request this, please ignore this email.`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Error sending email" });
      } else {
        console.log("Password reset email sent: " + info.response);
        res.json({
          message: "Password reset link sent to your email",
          client: updatedClient,
        });
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/user/reset-password", async (req, res) => {
  const resetToken = req.query.resetToken;
  const { newPassword, confirmNewPassword } = req.query

  try {
    const [updatedRowCount] = await Userlogin.update(
      { userpass: newPassword, client_id: null },
      { where: { client_id: resetToken } }
    );

    if (updatedRowCount === 0) {
      return res.status(404).json({ message: "Invalid or expired reset token" });
    }

    // Check if newPassword and confirmNewPassword match
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    res.json({
      message: "Password reset successful",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});



module.exports = router;
