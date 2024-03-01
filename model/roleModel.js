const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema({

  role: {
    type:String,  
  },
  
  
},{timestamps: true});

const Role = mongoose.model("Role", roleSchema);

module.exports = Role;
