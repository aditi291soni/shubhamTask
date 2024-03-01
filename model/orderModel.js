const mongoose = require("mongoose");
const Schema = mongoose.Schema;



const orderSchema = new mongoose.Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    itemName: [
      { type: Schema.Types.ObjectId, ref: "Shop", required: true },
    ], 
    totalAmount: { type: Number, required: true }, 
    quantity : { type: Number, default:0},
    status: {
      type: String,
      enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
