var express = require("express");
var router = express.Router();
var {
  addOrder,
  deleteOrder,
  updateOrder,
  allOrder,
} = require("../controller/orderController");
router.put("/order/update/:id", updateOrder); // updated order
router.delete("/order/delete/:id", deleteOrder); // delete  order
router.post("/order/create", addOrder); // create  order
router.post("/order", allOrder); // all  order
module.exports = router;
