const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
  userId: { type: String, default: 'demo-user' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  qty: { type: Number, default: 1 },
  addedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CartItem', CartItemSchema);
