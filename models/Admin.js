const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    admin_name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    admin_email: {
      type: Schema.Types.ObjectId,
      ref: "Category",
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
    created_date: {
      type: Date,
      default: Date.now,
    },
    updated_date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = model("Admin", adminSchema);
