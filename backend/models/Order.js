const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  quantity: Number,
  order: String,
  address: String
});

module.exports = mongoose.model('Order', orderSchema);
