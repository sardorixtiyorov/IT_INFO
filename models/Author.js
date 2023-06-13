const { Schema, model } = require("mongoose");

const authorSchema = new Schema({
  author_first_name: {
    type: String,
    required: true,
  },
  author_last_name: {
    type: String,
  },
});
module.exports = model("Author", authorSchema);
