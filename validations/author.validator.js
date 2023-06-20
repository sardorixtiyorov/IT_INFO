const Joi = require("joi");
const getFullName = (parent) => {
  return parent.author_first_name + " " + parent.author_last_name;
};
const authorSchema = Joi.object({
  author_first_name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),
  author_last_name: Joi.string().pattern(new RegExp("^[a-zA-Z]+$")).required(),
  author_fullname: Joi.string().default(getFullName),
  author_nick_name: Joi.string().max(20),
  author_email: Joi.string().email(),
  author_phone: Joi.string().pattern(/\d{2}-\d{3}-\d{2}-\d{2}/),
  author_password: Joi.string().min(6).max(20),
  confirm_password: Joi.ref("author_password"),
  author_info: Joi.string(),
  author_position: Joi.string(),
  author_photo: Joi.string().default("/author/avatar.jpg"),
  is_expert: Joi.boolean().default(false),
});

module.exports = authorSchema;
