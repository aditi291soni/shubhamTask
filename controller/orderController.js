const Order = require("../model/orderModel");
const User = require("../model/userModel");
const { decodeToken } = require("../controller/common");
const jwt = require("jsonwebtoken");

exports.addOrder = async (req, res, next) => {
  try {
  
     const token = await decodeToken(req, res);
     const user = await User.findById(token.id);
      const {  itemName, totalAmount, status,price,quantity } = req.body;
 

      const newOrder = new Order({
        user: user._id,
        itemName,
        totalAmount,
        status,
        price,
        quantity,
      });

      console.log(newOrder);
      await newOrder.save();

      res.status(201).json({ message: "Order created successfully", newOrder });
   
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
  

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Send success response
    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;
  
  
      const updatedOrder = await Order.findByIdAndUpdate(orderId, req.body, {
        new: true,
      });

      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }

      res
        .status(200)
        .json({ message: "Order updated successfully", order: updatedOrder });
    
  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.allOrder = async (req, res, next) => {
  try {
  
   
      const order = await Order.find({});

      res.status(200).json({ message: "all order", order });

  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
