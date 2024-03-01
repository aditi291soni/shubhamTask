const Offer = require("../model/offerModel");
const User = require("../model/userModel");
const { decodeToken } = require("../controller/common");
const jwt = require("jsonwebtoken");
exports.addOffer = async (req, res, next) => {
  try {
    const token = await decodeToken(req, res);
    //  const token = req.cookies.access_token;
    //  const decodedToken = jwt.decode(token);

    // Log the decoded payload
    console.log("t", token.id);
    const user = await User.findById(token.id);
    if (user.isAdmin) {
      const { couponCode, discountAmount, validityPeriod } = req.body;
      const existingOffer = await Offer.findOne({ couponCode });

      if (existingOffer) {
        return res.status(400).json({ message: "Coupon code already exists" });
      }

      const newOffer = new Offer({
        couponCode,
        discountAmount,
        validityPeriod,
      });

      console.log(newOffer);
      await newOffer.save();

      res.status(201).json({ message: "Offer created successfully",newOffer });
    } else {
      res.status(400).json({ message: "not authorized" });
    }
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
exports.deleteOffer = async (req, res, next) => {
  try {
      const offerId = req.params.id;
     const token = await decodeToken(req, res);
     const user = await User.findById(token.id);
     if (!user.isAdmin) {
       return res.status(403).json({ message: "Unauthorized" });
     }

  
  

  
    const deletedOffer = await Offer.findByIdAndDelete(offerId);

    if (!deletedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }

    // Send success response
    res.status(200).json({ message: "Offer deleted successfully" });
  } catch (error) {
    console.error("Error deleting offer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }

};
exports.updateOffer = async (req, res, next) => {
 try {
   
    const offerId = req.params.id;
  const token = await decodeToken(req, res);
     const user = await User.findById(token.id);
     if (user.isAdmin) {
    const updatedOffer = await Offer.findByIdAndUpdate(offerId, req.body, { new: true });

    if (!updatedOffer) {
      return res.status(404).json({ message: 'Offer not found' });
    }

  
    res.status(200).json({ message: 'Offer updated successfully', offer: updatedOffer });
  }else{
 return res.status(403).json({ message: "Unauthorized" });
  }
} catch (error) {
    console.error('Error updating offer:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
exports.allOffer = async (req, res, next) => {
  try {
  
    const token = await decodeToken(req, res);
    const user = await User.findById(token.id);
    if (user.isAdmin) {
      const offer = await Offer.find({
      });

      res
        .status(200)
        .json({ message: "all offer",offer});
    } else {
      return res.status(403).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error updating offer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

