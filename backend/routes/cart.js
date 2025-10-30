
const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const mongoose = require('mongoose');


function getUserId(req) {
  return req.header('x-user-id') || req.query.userId || 'demo-user';
}


router.post('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { productId, qty = 1 } = req.body;
    if (!productId) return res.status(400).json({ error: 'productId required' });
    if (!mongoose.Types.ObjectId.isValid(productId)) return res.status(400).json({ error: 'invalid productId' });

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

  
    let item = await CartItem.findOne({ userId, productId });
    if (item) {
      item.qty = Math.max(1, qty);
      await item.save();
    } else {
      item = await CartItem.create({ userId, productId, qty: Math.max(1, qty) });
    }

    res.json({ id: item._id, productId: item.productId, qty: item.qty });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add to cart' });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const userId = getUserId(req);
    const id = req.params.id;
    await CartItem.deleteOne({ _id: id, userId });
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to remove item' });
  }
});


router.get('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const items = await CartItem.find({ userId }).populate('productId').lean();

    const result = items.map(it => ({
      id: it._id.toString(),
      productId: it.productId ? it.productId._id.toString() : null,
      name: it.productId ? it.productId.name : 'Unknown',
      price: it.productId ? it.productId.price : 0,
      qty: it.qty
    }));

    const total = result.reduce((sum, it) => sum + (it.price * it.qty), 0);

    res.json({ items: result, total });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch cart' });
  }
});

module.exports = router;
