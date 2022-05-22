const express = require('express');
const Payment = require('../models/payment');
const router = express.Router();
const Razorpay = require('razorpay');
const shortid = require('shortid');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

router.post('/', async (req, res) => {
  try {
    const { order, Orderdata } = req.body;

    const {
      orderCreationId,
      razorpayPaymentId,
      razorpayOrderId,
      razorpaySignature,
    } = Orderdata;

    const shasum = crypto.createHmac('sha256', 'Mx1ejcaSeROoMp3l0wgHBiMt');
    shasum.update(`${orderCreationId}|${razorpayPaymentId}`);
    const digest = shasum.digest('hex');

    if (digest !== razorpaySignature)
      return res.status(400).json({ msg: 'Transaction not legit!' });

    const finaleOrder = await Payment.create(order);

    console.log('final order', finaleOrder);

    res.send(finaleOrder);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/', async (req, res) => {
  try {
    const allPayment = await Payment.find()
      .populate('user', '-password')
      .populate('orderedProducts.product');

    res.send(allPayment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.get('/:userId', async (req, res) => {
  try {
    const userPayment = await Payment.find({ user: req.params.userId })
      .populate('user', '-password')
      .populate('orderedProducts.product')
      .lean()
      .exec();

    if (userPayment.length == 0) {
      return res.send("This user don't have placed any order");
    }

    res.send(userPayment);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

router.post('/pay', async (req, res) => {
  const { payment_capture, amount, currency } = req.body;

  const options = {
    amount: parseInt(amount) * 100,
    currency,
    receipt: shortid.generate(),
    payment_capture,
  };
  try {
    const response = await razorpay.orders.create(options);
    res.send({
      id: response.id,
      currency: response.currency,
      amount: response.amount.toString(),
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
