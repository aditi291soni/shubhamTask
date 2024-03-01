const User = require("../model/userModel");
const Shop=require('../model/shoppingModdel')
const jwt = require("jsonwebtoken");
exports.search = async (req, res) => {
  const { phone, Name } = req.body;
  console.log(req.body);
  const query = {};

  if (phone) {
    query.phone = { $regex: Number(phone)}; // Case-insensitive search by phone number
    console.log(query.phone)
  }

  if (Name) {
    query.Name = { $regex: Name, $options: "i" }; // Case-insensitive search by name
  }

  try {
    
    const users = await User.find(query);
    console.log(query)
    res.status(200).json({ users });
  } catch (error) {
    console.error("Error searching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.lowToHigh=async(req,res)=>{
   try {
     const items = await Shop.find().sort({ price: 1 }); 
     res.status(200).json(items);
   } catch (error) {
     console.error("Error sorting items:", error);
     res.status(500).json({ message: "Internal Server Error" });
   }
}
exports.highToLow = async (req, res) => {
  try {
    const items = await Shop.find().sort({ price: -1 });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error sorting items:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.decodeToken = async (req, res) => {
  const token = req.cookies.access_token;
  const decodedToken = jwt.decode(token);
  console.log(decodedToken);
return decodedToken;
  // Log the decoded payload

};
