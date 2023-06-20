const Joi = require("joi");

const authorEmailPassSchema = Joi.object({
  author_email: Joi.string().email().message("Invalid email").required(),
  author_password: Joi.string().min(6).max(30).required(),
});

module.exports = authorEmailPassSchema;
