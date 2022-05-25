const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
  {
    orderedProducts: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product',
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    shippingInfo: {
      address1: {
        type: String,
        required: true,
      },
      address2: {
        type: String,
        required: true,
      },
      pin: {
        type: Number,
        required: true,
      },
    },
    date: { type: Date, default: Date.now() },
    total: { type: Number, required: true },
    totalItems: { type: Number, required: true },
    transactionId: { type: String },
    status: {
      type: String,
      enum: ['Processing', 'Dispatched', 'Delivered'],
      default: 'Processing',
    },
    deliveryDate: Date,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model('payment', paymentSchema);
