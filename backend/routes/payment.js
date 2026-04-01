const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');

/**
 * POST /api/payment/process
 * Sandbox payment processor.
 * In production, replace this with your real payment gateway (e.g. Stripe, Flutterwave, Pesapal).
 */
router.post('/process', asyncHandler(async (req, res) => {
  const { method, amount, cardNumber, mpesaPhone } = req.body;
  const isSandbox = process.env.SANDBOX_MODE === 'true';

  if (method === 'sandbox' || isSandbox) {
    // Simulate a small network delay
    await new Promise((r) => setTimeout(r, 800));
    return res.json({
      success: true,
      sandbox: true,
      transactionId: 'SANDBOX-' + Date.now(),
      message: 'Sandbox payment approved. No real charge was made.',
    });
  }

  if (method === 'card') {
    // TODO: integrate Stripe / Flutterwave here
    // const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const paymentIntent = await stripe.paymentIntents.create({ amount: amount * 100, currency: 'usd' });
    return res.status(501).json({ message: 'Live card payments not configured yet. Set SANDBOX_MODE=true to test.' });
  }

  if (method === 'mpesa') {
    // TODO: integrate Daraja API (Safaricom M-Pesa) here
    return res.status(501).json({ message: 'M-Pesa live integration not configured yet.' });
  }

  res.status(400).json({ message: 'Unknown payment method' });
}));

module.exports = router;
