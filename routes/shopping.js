var express = require("express");
var router = express.Router();
var {
  addItem,
  allItem,
  deleteItem,
  updateById,
  getById,
} = require("../controller/shoppingController");
router.post("/addItem", addItem); //add item in cart
router.get("/allItem ", allItem); //see all item in cart
router.delete("item/delete/:id", deleteItem); // delete item through cart
router.put("item/edit/:id", updateById); //edit item of cart
router.put("item/:id", getById); //edit item of cart
module.exports = router;
