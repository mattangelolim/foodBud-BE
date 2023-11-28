const express = require("express");
const router = express.Router();
const Payment = require('../../models/payment');

router.get('/all/payments', async (req, res) => {

  try {
    const payments = await Payment.findAll();
    res.json(payments);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/client/payment', async (req, res) => {
    const { event_id, payment_description, payment_paid, payment_receipt } = req.body;
  
    try {
      const newPayment = await Payment.create({
        event_id,
        payment_description,
        payment_paid,
        payment_receipt,
      });
  
      res.status(200).json({ message: 'Payment submitted successfully! Kindly wait for Admin Confirmation' });
      res.json(newPayment);
      
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

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

router.post('/client/charge', async (req, res) => {
    const { event_id, payment_description, payment_availed} = req.body;
  
    try {
      const newPayment = await Payment.create({
        event_id,
        payment_description,
        payment_availed,
      });
  
      res.status(200).json({ message: 'Availed Services added successfully!' });
      res.json(newPayment);
      
  
    } catch (error) {
  
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  // Delete payment route
router.delete('/client/payment/:id', async (req, res) => {
    const id = req.params.id;

    try {
        // Check if the payment with the given ID exists
        const paymentToDelete = await Payment.findByPk(id);

        if (!paymentToDelete) {
            return res.status(404).json({ error: 'Payment not found' });
        }

        // Delete the payment
        await paymentToDelete.destroy();

        res.status(200).json({ message: 'Payment deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;