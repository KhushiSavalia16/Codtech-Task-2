// routes/checkout.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const router = express.Router();

router.post('/', async (req, res) => {
  const { paymentMethodId } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000, // example amount in cents
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
    });

    res.send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

module.exports = router;
