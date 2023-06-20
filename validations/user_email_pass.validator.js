const Joi = require("joi");

const userEmailPassSchema = Joi.object({
  user_email: Joi.string().email().message("Invalid email").required(),
  user_password: Joi.string().min(6).max(30).required(),
});

module.exports = userEmailPassSchema;
