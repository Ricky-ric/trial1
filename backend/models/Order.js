const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  title: String,
  author: String,
  price: Number,
  qty: { type: Number, default: 1 },
});

const orderSchema = new mongoose.Schema(
  {
    orderNumber: { type: String, unique: true },
    customer: {
      firstName: String,
      lastName: String,
      email: { type: String, required: true },
    },
    shippingAddress: {
      street: String,
      city: String,
      postalCode: String,
      country: { type: String, default: 'Kenya' },
    },
    items: [orderItemSchema],
    subtotal: Number,
    shippingCost: Number,
    total: Number,
    paymentMethod: { type: String, enum: ['card', 'mpesa', 'sandbox'], default: 'sandbox' },
    paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    status: {
      type: String,
      enum: ['placed', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'placed',
    },
    sandboxMode: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Auto-generate order number before saving
orderSchema.pre('save', function (next) {
  if (!this.orderNumber) {
    this.orderNumber = 'MERLIN-' + Date.now().toString().slice(-6);
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
