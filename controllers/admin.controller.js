const errorHandler = require("../helpers/error_handler");
const Admin = require("../models/Admin");
const { default: mongoose } = require("mongoose");
const { adminValidation } = require("../validations/admin.validation");
const bcrypt = require("bcrypt");

const createAdmin = async (req, res) => {
  try {
    const { error } = adminValidation(req.body);
    if (error) return errorHandler(res, error.details[0].message);

    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    const admin = await Admin.findOne({
      admin_name: { $regex: admin_name, $options: "i" },
    });
    if (admin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(admin_password, 7);
    const newAdmin = new Admin({
      admin_name,
      admin_email,
      admin_password: hashedPassword,
      admin_is_active,
      admin_is_creator,
    });
    newAdmin.save();

    res.status(201).json({ message: "Admin added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    if (!admins) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json(admins);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAdminById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const admin = await Admin.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getAdminByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!mongoose.isValidObjectId(req.params.name)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }

    const admin = await Admin.find({
      admin_name: { $regex: name, $options: "i" },
    }).populate("parent_admin_id");
    if (!admin) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateAdmin = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    } = req.body;
    const admin = await Admin.findByIdAndUpdate(id, {
      admin_name,
      admin_email,
      admin_password,
      admin_is_active,
      admin_is_creator,
    });
    if (!admin) {
      return res.status(404).json({ message: "No admin found" });
    }

    admin.save();
    res.status(200).json({ message: "Admin updated successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const dict = await Admin.findByIdAndDelete(id);
    if (!dict) {
      return res.status(404).json({ message: "No admin found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getAdminByName,
};
