const Joi = require("joi");

const adminEmailPassSchema = Joi.object({
  admin_email: Joi.string().email().message("Invalid email").required(),
  admin_password: Joi.string().min(6).max(30).required(),
});

module.exports = adminEmailPassSchema;
