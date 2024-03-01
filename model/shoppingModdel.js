const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  itemName: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  price: {
    type: String,
    required: true,
  },



},{timestamps:true});

const Shop = mongoose.model("Shop", shopSchema);

module.exports = Shop;
