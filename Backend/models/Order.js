const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  creationDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  postal: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  customerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming User model for customers
    required: true,
  },
  status: {
    type: String,
    enum: [
      "confirmed",
      "ready_for_delivery",
      "item_on_the_way",
      "delivered",
      "refunded",
      "scheduled",
    ],
    required: true,
    default: "confirmed", // Set a default status if not provided
  },
});
orderSchema.index({ creationDate: -1 });

module.exports = mongoose.model("Order", orderSchema);
