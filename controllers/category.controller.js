const errorHandler = require("../helpers/error_handler");
const Category = require("../models/Category");
const { default: mongoose } = require("mongoose");
const { categoryValidation } = require("../validations/category");

const createCategory = async (req, res) => {
  try {
    const { error } = categoryValidation(req.body);
    if (error) return errorHandler(res, error.details[0].message);

    const { category_name, parent_category_id } = req.body;
    const category = await Category.findOne({
      category_name: { $regex: category_name, $options: "i" },
    });
    if (category) {
      return res.status(400).json({ message: "Category already exists" });
    }
    const newCategory = new Category({
      category_name,
      parent_category_id,
    });
    newCategory.save();

    res.status(201).json({ message: "Category added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate("parent_category_id");
    if (!categories) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(categories);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const category = await Category.findById(id).populate("parent_category_id");
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getCategoryByName = async (req, res) => {
  try {
    const { name } = req.params;
    if (!mongoose.isValidObjectId(req.params.name)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }

    const category = await Category.find({
      category_name: { $regex: name, $options: "i" },
    }).populate("parent_category_id");
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json(category);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateCategory = async (req, res) => {
  try {

    const { error } = categoryValidation(req.body);
    if (error) return errorHandler(res, error.details[0].message);


    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const { category_name, parent_category_id } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "No category found" });
    }
    if (category_name) {
      category.category_name = category_name;
    }
    if (parent_category_id) {
      category.parent_category_id = parent_category_id;
    }
    category.save();
    res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteCategory = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const dict = await Category.findByIdAndDelete(id);
    if (!dict) {
      return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};
module.exports = {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getCategoryByName,
};
