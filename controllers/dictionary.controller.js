const errorHandler = require("../helpers/error_handler");
const Dictionary = require("../models/Dictionary");
const { default: mongoose } = require("mongoose");

const addDict = async (req, res) => {
  try {
    const { term } = req.body;
    const dict = await Dictionary.findOne({
      term: { $regex: term, $options: "i" },
    });
    if (dict) {
      return res.status(400).json({ message: "Term already exists" });
    }
    const newTerm = new Dictionary({ term, letter: term[0] });
    newTerm.save();

    res.status(201).json({ message: "Term added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDict = async (req, res) => {
  try {
    const dict = await Dictionary.find();
    if (!dict) {
      return res.status(404).json({ message: "No dictionary found" });
    }
    res.status(200).json(dict);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getDictById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const dict = await Dictionary.findById(id);
    if (!dict) {
      return res.status(404).json({ message: "No dictionary found" });
    }
    res.status(200).json(dict);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getDictByLetter = async (req, res) => {
  try {
    const { letter } = req.params;

    const dict = await Dictionary.findOne({
      letter: { $regex: letter, $options: "i" },
    });
    if (!dict) {
      return res.status(404).json({ message: "No dictionary found" });
    }
    res.status(200).json(dict);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getDictByTerm = async (req, res) => {
  try {
    const { term } = req.params;
    const dict = await Dictionary.find({
      term: { $regex: term, $options: "i" },
    });
    if (!dict) {
      return res.status(404).json({ message: "No dictionary found" });
    }
    res.status(200).json(dict);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateDict = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const { term } = req.body;
    const dict = await Dictionary.findByIdAndUpdate(
      id,
      { term, letter: term[0] },
      { new: true }
    );
    if (!dict) {
      return res.status(404).json({ message: "No dictionary found" });
    }
    res.status(200).json({ message: "Successfully updated" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const deleteDict = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).send({
        message: "Invalid  id",
      });
    }
    const { id } = req.params;
    const dict = await Dictionary.findByIdAndDelete(id);
    if (!dict) {
      return res.status(404).json({ message: "No dictionary found" });
    }
    res.status(200).json({ message: "Successfully deleted" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getDict,
  addDict,
  updateDict,
  deleteDict,
  getDictById,
  getDictByLetter,
  getDictByTerm,
};
