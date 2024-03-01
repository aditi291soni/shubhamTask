const Role = require("../model/roleModel");

// delete
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const deletedData = await Role.findByIdAndDelete(id);
    console.log(deletedData);
    if (!deletedData) {
      res.status(404).json({ data: deletedData });
    }
    res.status(200).json({ message: " Delete Role ", data: deletedData });
  } catch (error) {
    res.json({ error: "Error" });
  }
};
// edit

exports.roleUpdate = async (req, res) => {
  const userId = req.params.id;
  try {
    const roles = await Role.findById({ _id: req.params.id });
    if (roles) {
      const newData = await Role.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json({ message: "Role updated" });
    }
  } catch (err) {
    res.status(400).json("Bad Request");
  }
};
// create
exports.createRole = async (req, res, next) => {
  try {
    console.log(req.body.role);
    if (req.body.role && req.body.role !== "") {
      const newRole = new Role(req.body);

      const createdRole = await newRole.save();

      res
        .status(200)
        .json({ message: "Role created successfully!", data: createdRole });
    } else {
      res.status(400).status("Bad Request");
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// getAll role
exports.allRole = async (req, res) => {
  try {
    const data = await Role.find({});

    if (data) {
      res.status(200).json({ message: " All Role ", data: data });
    } else {
      res.status(404).json("No roles found");
    }
  } catch (error) {
    res.json({ error });
  }
};
