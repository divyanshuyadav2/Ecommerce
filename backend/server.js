// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const productsRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const checkoutRoute = require('./routes/checkout');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// environment
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/vibecommerce';
const PORT = process.env.PORT || 5000;

// connect mongo
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.warn('MongoDB connection error:', err.message));

// routes
app.use('/api/products', productsRoute);
app.use('/api/cart', cartRoute);
app.use('/api/checkout', checkoutRoute);

app.get('/', (req, res) => res.json({ ok: true, message: 'Vibe Commerce API' }));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

module.exports = app; // for tests
