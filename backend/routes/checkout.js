
const express = require('express');
const router = express.Router();
const Receipt = require('../models/Receipt');
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');
const mongoose = require('mongoose');

function getUserId(req) {
  return req.header('x-user-id') || req.query.userId || 'demo-user';
}


router.post('/', async (req, res) => {
  try {
    const userId = getUserId(req);
    const { cartItems, name, email } = req.body;

    let itemsToProcess = [];

    if (Array.isArray(cartItems) && cartItems.length > 0) {
      
      for (const ci of cartItems) {
        if (!ci.productId) continue;
        const prod = await Product.findById(ci.productId);
        if (!prod) continue;
        itemsToProcess.push({
          productId: prod._id,
          name: prod.name,
          price: prod.price,
          qty: Math.max(1, ci.qty || 1)
        });
      }
    } else {
      
      const cart = await CartItem.find({ userId }).populate('productId');
      for (const c of cart) {
        if (!c.productId) continue;
        itemsToProcess.push({
          productId: c.productId._id,
          name: c.productId.name,
          price: c.productId.price,
          qty: c.qty
        });
      }
    }

    if (itemsToProcess.length === 0) {
      return res.status(400).json({ error: 'No items to checkout' });
    }

    const total = itemsToProcess.reduce((s, it) => s + (it.price * it.qty), 0);

    const receipt = await Receipt.create({
      userId,
      items: itemsToProcess,
      total,
      customer: { name: name || 'Guest', email: email || '' }
    });

    
    await CartItem.deleteMany({ userId });

    res.json({
      id: receipt._id,
      total: receipt.total,
      timestamp: receipt.createdAt,
      items: receipt.items,
      customer: receipt.customer
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

module.exports = router;
