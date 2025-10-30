const mongoose = require('mongoose');

const ReceiptSchema = new mongoose.Schema({
  userId: { type: String, default: 'demo-user' },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number,
  customer: { name: String, email: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
