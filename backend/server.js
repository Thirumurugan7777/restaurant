const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Order = require('./models/Order');

require('dotenv').config(); // Load environment variables if using .env

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ✅ Connect to MongoDB Atlas
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ API endpoint to save orders
app.post('/api/orders', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(200).send('✅ Order saved successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Error saving order');
  }
});

// ✅ Start server
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
