const shop = require("../model/shoppingModdel");
const Role = require("../model/roleModel");
const User = require("../model/userModel");
const jwt = require("jsonwebtoken");

exports.addItem = async (req, res, next) => {
  try {
    const token = req.cookies.access_token;
    const decodedToken = jwt.decode(token);

    // Log the decoded payload
    console.log(decodedToken);

    const { itemName, price, image } = req.body;
    const user = await User.findById(decodedToken.id);

    if (user.isAdmin) {
      const newItem = new shop({
        itemName,
        price,
        image,
      });
      const createdItem = await newItem.save();

      res
        .status(200)
        .json({ message: "Data created successfully!", data: createdItem });
    } else {
      res.status(200).json({ message: "only admin can create data" });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};
exports.allItem = async (req, res) => {
  try {
    const data = await shop.find({});
    res.status(200).json({ message: " All Data ", data: data });
  } catch (error) {
    res.json({ error }); // Re-throw the error for handling in the route handler
  }
};
// getbyid
exports.getById = async (req, res) => {
  const userId = req.params.id;
  try {
    const item = await User.findById({ _id: req.params.id });
    if (item) {
      res.status(200).json({ message: "User found", item });
    } else {
      res.status(404).json({ message: "No User found" });
    }
  } catch (err) {
    res.status(400).json("Bad Request");
  }
};
// Delete Item
exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedData = await User.findByIdAndDelete(id);
    if (!deletedData) {
      res.status(404).json({ data: deletedData });
    }
    res.status(200).json({ message: " Delete All Data ", data: deletedData });
  } catch (error) {
    res.json({ error }); // Re-throw the error for handling in the route handler
  }
};
// edit

exports.updateById = async (req, res) => {
  const userId = req.params.id;
  const { name, email } = req.body;
  const userIndex = users.findIndex((user) => user.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], name, email };
    res.json(users[userIndex]);
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
