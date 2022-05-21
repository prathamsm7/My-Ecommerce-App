const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'category',
    required: true,
  },
  images: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  cpu: { type: String, required: true },
  camera: { type: String, required: true },
  size: { type: String, required: true },
  weight: { type: String, required: true },
  display: { type: String, required: true },
  battery: { type: String, required: true },
  memory: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('product', productSchema);
