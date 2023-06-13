const { Schema, model } = require("mongoose");

const synonymSchema = new Schema(
  {
    dict_id: {
      type: Schema.Types.ObjectId,
      ref: "Dictionary",
    },
    desc_id: {
      type: Schema.Types.ObjectId,
      ref: "Description",
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Synonym", synonymSchema);
