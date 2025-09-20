const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect('mongodb://localhost:27017/hopkar', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected 🟢'))
.catch(err => console.error('MongoDB error:', err));

// Order Model
const orderSchema = new mongoose.Schema({
  userName: String,
  address: String,
  serviceType: String, // press, tiffin, tailor...
  status: { type: String, default: 'pending' }, // pending / in-progress / done
  vendorAccepted: { type: Boolean, default: false },
  partnerAssigned: { type: Boolean, default: false },
  partnerName: { type: String, default: '' }
});

const Order = mongoose.model('Order', orderSchema);

// Routes
app.get('/', (req, res) => {
  res.send('Backend + MongoDB is working 😎');
});

// Create new order
app.post('/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all orders
app.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Vendor accept order
app.post('/orders/accept/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { vendorAccepted: true, status: 'in-progress' }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Partner assign order
app.post('/orders/assign/:id', async (req, res) => {
  try {
    const { partnerName } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { partnerAssigned: true, partnerName }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Mark order done
app.patch('/orders/status/:id', async (req, res) => {
  try {
    const { status } = req.body; // done
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/*
📝 Sample JSON to POST at http://localhost:5000/orders
{
  "userName": "Aaradhya",
  "address": "Sector 15",
  "serviceType": "press"
}
*/
