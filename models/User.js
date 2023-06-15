const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    user_email: {
      type: String,
      unique: true,
    },
    user_password: {
      type: String,
    },
    user_info: {
      type: String,
    },
    user_photo: {
      type: String,
      default: "../avatar.jpg",
    },

    user_is_active: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("User", userSchema);
