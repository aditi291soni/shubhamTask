var express = require("express");
var router = express.Router();
var {
  register,
  allUser,
  login,
  deleteById,
  registerAdmin,
  getById,
  addToWallet,
} = require("../controller/registerController");
const { verifyAdmin, verifyUser } = require("../utils/verifyToken");

var {
  search,
  highToLow,
  lowToHigh,

} = require("../controller/common");
/* GET home page. */
router.get("/");
router.get("/getAll", allUser); //all register user
router.put("/user/:id", getById); //all register user
router.delete("/delete/:id", deleteById); //delete register user on basis of id
router.post("/register", register); //register user
router.post("/registerAdmin", registerAdmin); //register admin
router.post("/login", login); // login in register user

router.post("/search", search); //search
router.post("/high-to-low", highToLow); //highToLow
router.post("/low-to-high", lowToHigh); //lowToHigh
router.post("/add-to-wallet", addToWallet); //lowToHigh
module.exports = router;
