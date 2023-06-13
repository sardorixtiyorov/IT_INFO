const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    category_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    parent_category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Category", categorySchema);
