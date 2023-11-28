const express = require("express");
const router = express.Router();
const Payment = require("../../models/payment");

router.get("/all/payments", async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.status(200).json({ payments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/event/payments", async (req, res) => {
  const eventId = req.query.event_id;

  try {
    console.log("Received request with eventId:", eventId);

    if (!eventId) {
      return res
        .status(400)
        .json({ error: "Event ID is required in the query parameters" });
    }

    const payments = await Payment.findAll({
      where: {
        event_id: eventId,
      },
    });

    console.log("Retrieved payments:", payments);

    res.json(payments);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add Payment
router.post("/client/payment", async (req, res) => {
  const { event_id, payment_description, payment_paid, payment_receipt } =
    req.body;

  try {
    const newPayment = await Payment.create({
      event_id,
      payment_description,
      payment_paid,
      payment_receipt,
    });

    res.status(200).json({
      message:
        "Payment submitted successfully! Kindly wait for Admin Confirmation",
    });
    res.json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PAANO PO YUNG API NA KUNG ANO YUNG NASA INVOICE, YUN DIN DADAGDAG SA ACCOUNTS TABLE NI CLIENT PERO SAME COLUMNS ALANG MADADAGDAGAN TULAD SA /CLIENT/CHARGE
// ANG INIISIP KO KASI MAGKAKAROON NG INVOICE ITEMS TAPOS KUNG ANO LAMAN NON YUN RIN YUNG MAG AADD DOON SA /CLIENT/CHARGE

//   router.post('/client/availed', async (req, res) => {
//     const { event_id, payment_description, payment_availed} = req.body;

//     try {
//       const newPayment = await Payment.create({
//         event_id,
//         payment_description,
//         payment_availed
//       });

//       res.status(200).json({ message: 'Availed added successfully!' });
//       res.json(newPayment);

//     } catch (error) {

//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// Admin Add Charges
router.post("/client/charge", async (req, res) => {
  const { event_id, payment_description, payment_availed } = req.body;

  try {
    const newPayment = await Payment.create({
      event_id,
      payment_description,
      payment_availed,
    });

    res.status(200).json({ message: "Availed Services added successfully!" });
    res.json(newPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete payment route
router.delete("/delete/payment/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Check if the payment with the given ID exists
    const paymentToDelete = await Payment.findByPk(id);

    if (!paymentToDelete) {
      return res.status(404).json({ error: "Payment not found" });
    }

    // Delete the payment
    await paymentToDelete.destroy();

    res.status(200).json({ message: "Payment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
