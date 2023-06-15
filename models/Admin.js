const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    admin_name: {
      type: String,
      required: true,
      trim: true,
    },
    admin_email: {
      type: String,
      unique: true,
    },
    admin_password: {
      type: String,
    },
    admin_is_active: {
      type: Boolean,
    },
    admin_is_creator: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = model("Admin", adminSchema);
