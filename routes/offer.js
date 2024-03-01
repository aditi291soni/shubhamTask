var express = require("express");
var router = express.Router();
var {
  addOffer,
  deleteOffer,
  updateOffer,
  allOffer
} = require("../controller/offerController");
router.put("/offer/update/:id", updateOffer); // updated offer
router.delete("/offer/delete/:id", deleteOffer); // delete  offer
router.post("/offer/create", addOffer); // create  offer
router.post("/offer", allOffer); // all  offer
module.exports = router;
