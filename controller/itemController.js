const Item = require("../model/shoppingModdel");
const User = require("../model/userModel");
const { decodeToken } = require("../controller/common");
const jwt = require("jsonwebtoken");
exports.addItem = async (req, res, next) => {
  try {
    const token = await decodeToken(req, res);
    const user = await User.findById(token.id);
    if (user.isAdmin) {
      const { image, price, itemName } = req.body;
      const existingItem = await Item.findOne({ itemName });

      if (existingItem) {
        return res.status(400).json({ message: "Item already exists" });
      }

      const newItem = new Item({
        image,
        price,
        itemName,
      });

      console.log(newItem);
      await newItem.save();

      res.status(201).json({ message: "Item created successfully", newItem });
    } else {
      res.status(400).json({ message: "not authorized" });
    }
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const token = await decodeToken(req, res);
    const user = await User.findById(token.id);
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deletedItem = await Item.findByIdAndDelete(itemId);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Send success response
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.updateItem = async (req, res, next) => {
  try {
    const itemId = req.params.id;
    const token = await decodeToken(req, res);
    const user = await User.findById(token.id);
    if (user.isAdmin) {
      const updatedItem = await Item.findByIdAndUpdate(itemId, req.body, {
        new: true,
      });

      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }

      res
        .status(200)
        .json({ message: "Item updated successfully", item: updatedItem });
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.allItem = async (req, res, next) => {
  try {
    const token = await decodeToken(req, res);
    const user = await User.findById(token.id);
    if (user.isAdmin) {
      const item = await Item.find({});

      res.status(200).json({ message: "all item", item });
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
// exports.getById = async (req, res, next) => {
//   try {
//     const itemId = req.params.id;
//     const token = await decodeToken(req, res);
//     const user = await User.findById(token.id);
//     if (user.isAdmin) {
//       const updatedItem = await Item.findById(itemId);
//       res.status(200).json({ message: "Item found", updatedItem });
//     } else {
//       return res.status(403).json({ message: "Unauthorized" });
//     }
//   } catch (error) {
   
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };