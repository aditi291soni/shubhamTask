const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const offerSchema = new Schema(
  {
    couponCode: { type: String, unique: true },
    discountAmount: { type: Number, required: true },
    validityPeriod: { type: Number, required: true },
  },
  { timestamps: true }
);

const Offer = mongoose.model("Offer", offerSchema);

module.exports = Offer;
