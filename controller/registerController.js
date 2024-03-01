const User = require("../model/userModel");
const Role = require("../model/roleModel");
const { decodeToken } = require("../controller/common");
const Order = require("../model/offerModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
exports.register = async (req, res, next) => {
  try {
    const { Name, username, email, phone, address } = req.body;
    const role = await Role.findOne({ role: "User" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      Name,
      username,
      email,
      phone,
      password: hashPassword,
      address,
      roles: [role._id],
    });
    console.log(newUser);
    const createdUser = await newUser.save();
    console.log(createdUser);
    res.status(200).json({ message: "User created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.registerAdmin = async (req, res, next) => {
  try {
    const { Name, username, email, phone, address } = req.body;
    const role = await Role.findOne({ role: "Admin" });
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      Name,
      username,
      email,
      phone,
      isAdmin:true,
      password: hashPassword,
      address,
      roles: [role._id],
    });
    console.log(newUser);
    const createdUser = await newUser.save();
    console.log(createdUser);
    res.status(200).json({ message: "Admin created successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.allUser = async (req, res) => {
  try {
    const data = await User.find({}).populate("order");
    res.status(200).json({ message: " All Data ", data: data });
  } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error });
  }
};
exports.getById = async (req, res) => {
  const userId = req.params.id;
  try {
    const roles = await User.findById({ _id: req.params.id });
    if (roles) {
      // const newData = await User.findByIdAndUpdate(
      //   req.params.id,
      //   {
      //     $set: req.body,
      //   },
      //   { new: true }
      // );

      res.status(200).json({ message: "User found",roles });
    }else{
       res.status(404).json({ message: "No User found"});
    }
  } catch (err) {
    res.status(400).json("Bad Request");
  }
};
exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    .populate(
      "roles",
      "role"
    );
    const { roles } = user;
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if (!isPassword) {
      return res.status(400).json({ message: "Password incorrect" });
    }
    const token = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin, //payload
        roles: roles,
      },
      process.env.jwt_secret //secretkey
    );
    console.log(token);
    res
      .cookie("access_token", token, { httpOnly: "true" })
      .status(200)
      .json({ message: "Login Success",token ,user});
      
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};
// exports.deleteAllUser = async (req, res) => {
//   try {
//     const data = await User.delete({});
//     res.status(200).json({ message: " Delete All Data ", data: data });
//   } catch (error) {
//    res.json({ error });
//   }
// };
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedData = await User.findByIdAndDelete(id);
    if (!deletedData) {
      res.status(404).json({ data: deletedData });
    }
    res.status(200).json({ message: " Delete All Data ", data: deletedData });
  } catch (error) {
    res.json({ error });
  }
};
exports.addToWallet = async (req, res) => {
  const token = await decodeToken(req, res);
  const user = await User.findById(token.id);
  const { amount } = req.body;

  try {
    if (!user._id) {
      return res.status(404).json({ message: "User not found" });
    }
    user.balance += amount;
    await user.save();
    console.log(user);
    res.status(200).json({ message: "Money added successfully", user });
  } catch (error) {
    console.error("Error adding money to user account:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

