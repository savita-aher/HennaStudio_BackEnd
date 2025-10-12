import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    contactNumber: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    date: { type: String, required: true }, // Format: 'YYYY-MM-DD'
    timeFrom: { type: String, required: true }, // e.g. '10:00 AM'
    timeTo: { type: String, required: true },   // e.g. '11:30 AM'
    items: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, default: null }
      }
    ],
    totalPrice: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;