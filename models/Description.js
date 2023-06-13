const { Schema, model } = require("mongoose");

const descSchema = new Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },
    category_id: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Description", descSchema);
