const errorHandler = require("../helpers/error_handler");
const Synonym = require("../models/Synonym");
const { default: mongoose } = require("mongoose");

const createSyn = async (req, res) => {
  try {
    const { dict_id, desc_id } = req.body;

    const newSyn = new Synonym({ dict_id, desc_id });
    newSyn.save();

    res.status(201).json({ message: "Synonym added successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};
const getSynonyms = async (req, res) => {
  try {
    const synonyms = await Synonym.find().populate("dict_id desc_id");
    if (!synonyms) {
      return res.status(404).json({ message: "No synonyms found" });
    }
    res.status(200).json(synonyms);
  } catch (error) {
    errorHandler(res, error);
  }
};
const getSynonym = async (req, res) => {
  try {
    const synonym = await Synonym.findById(req.params.id).populate(
      "dict_id desc_id"
    );
    if (!synonym) {
      return res.status(404).json({ message: "No synonym found" });
    }
    res.status(200).json(synonym);
  } catch (error) {
    errorHandler(res, error);
  }
};
const updateSynonym = async (req, res) => {
  try {
    const { dict_id, desc_id } = req.body;
    const synonym = await Synonym.findByIdAndUpdate(
      req.params.id,
      { dict_id, desc_id },
      { new: true }
    );
    if (!synonym) {
      return res.status(404).json({ message: "No synonym found" });
    }
    res.status(200).json(synonym);
  } catch (error) {
    errorHandler(res, error);
  }
};

const deleteSynonym = async (req, res) => {
  try {
    const synonym = await Synonym.findByIdAndDelete(req.params.id);
    if (!synonym) {
      return res.status(404).json({ message: "No synonym found" });
    }
    res.status(200).json({ message: "Synonym deleted successfully" });
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  createSyn,
  getSynonyms,
  getSynonym,
  updateSynonym,
  deleteSynonym,
};
