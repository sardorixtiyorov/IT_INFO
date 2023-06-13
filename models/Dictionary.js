const { Schema, model } = require("mongoose");

const dictSchema = new Schema(
  {
    term: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    letter: {
      type: String,
      uppercase: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Dictionary", dictSchema);
