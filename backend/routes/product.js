
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.get('/', async (req, res) => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
     
      const seed = [
        { name: 'Classic Tee', price: 499, description: 'Comfort cotton tee' },
        { name: 'Street Sneakers', price: 2499, description: 'Casual sneakers' },
        { name: 'Denim Jacket', price: 3499, description: 'Stylish denim jacket' },
        { name: 'Wireless Earbuds', price: 1999, description: 'Bluetooth earbuds' },
        { name: 'Backpack', price: 1299, description: 'Travel backpack' },
        { name: 'Smart Watch', price: 3999, description: 'Fitness smart watch' }
      ];
      await Product.insertMany(seed);
    }
    const products = await Product.find().lean();
   
    const normalized = products.map(p => ({ id: p._id.toString(), name: p.name, price: p.price, description: p.description }));
    res.json(normalized);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

module.exports = router;
