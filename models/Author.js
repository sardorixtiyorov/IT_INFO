const { Schema, model } = require("mongoose");

const authorSchema = new Schema(
  {
    author_first_name: {
      type: String,
      trim: true,
      required: true,
    },
    author_last_name: {
      type: String,
      trim: true,
    },
    author_nick_name: {
      type: String,
      trim: true,
      required: true,
    },
    author_email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    author_phone: {
      type: String,
    },
    author_password: {
      type: String,
      trim: true,
      required: true,
    },
    author_info: {
      type: String,
    },
    author_position: {
      type: String,
    },
    author_phote: {
      type: String,
    },
    is_expert: {
      type: Boolean,
    },
    author_token: {
      type: String,
    },
    author_activation_link: {
      type: String,
    },
    author_is_active: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);
module.exports = model("Author", authorSchema);
