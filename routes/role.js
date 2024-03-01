var express = require("express");
var router = express.Router();
var {
  roleUpdate,
  deleteById,
  createRole,
  allRole,
} = require("../controller/roleController");
router.put("/role/update/:id", roleUpdate); // updated the user role
router.delete("/role/delete/:id", deleteById); // delete the user role
router.post("/role/create", createRole); // create the user role
router.post("/role", allRole); // create the user role
module.exports = router;