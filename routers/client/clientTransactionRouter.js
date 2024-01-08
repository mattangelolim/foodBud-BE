const express = require('express')
const TransactionModel = require('../../models/TransactionModel')
const multer = require("multer");
const router = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        const uniqueFileName = generateRandomString(); // Generate a unique filename
        cb(null, uniqueFileName + "_" + Date.now() + ".jpg"); // Append a timestamp to the filename
    },
});


const upload = multer({ storage });

router.post("/add/transaction", upload.single('receipt'), async (req, res) => {
    try {
        // Assuming 'receipt' is the name attribute in your form for the file input
        const { event_id, description } = req.query;
        const receipt = req.file ? req.file.filename : null; // Get the uploaded filename

        // Create a new transaction with the received data
        const newTransaction = await TransactionModel.create({
            event_id: event_id,
            Receipt: receipt,
            status: 'Pending',
            description: description || null,
        });

        res.status(201).json({ message: 'Transaction added successfully', transaction: newTransaction });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.get("/get/transactions", async (req, res) => {
    try {
        const { event_id } = req.query;

        // Fetch all transactions with the specified event_id from the database
        const transactions = await TransactionModel.findAll({
            where: { event_id: event_id },
            attributes: ['Receipt', 'status', 'description', 'createdAt']
        });

        if (!transactions || transactions.length === 0) {
            return res.status(404).json({ message: 'No transactions found for the event_id' });
        }

        // You might want to extract specific fields or modify the response data before sending it
        res.status(200).json({ transactions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

router.post("/accept/transaction", async (req, res) => {
    try {
        const { event_id, description } = req.query;
        const { status } = req.body

        if (status === 'Rejected') {
            // If the status is rejected, delete the data in the Receipt column
            await TransactionModel.update({ status: status, Receipt: null }, {
                where: {
                    event_id: event_id,
                    description: description
                }
            });
        }else{
            const foundRow = await TransactionModel.update({ status: status }, {
                where: {
                    event_id: event_id,
                    description: description
                }
            });
        }

        res.status(200).json({ message: "Updated Transaction" })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
})

module.exports = router



function generateRandomString() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';

    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

