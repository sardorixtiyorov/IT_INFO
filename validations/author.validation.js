const Joi = require("joi");
const getFullName = (parent) => {
  return parent.author_first_name + " " + parent.author_last_name;
};

exports.authorValidation = (data) => {
  const schema = Joi.object({
    author_first_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .required(),
    author_last_name: Joi.string()
      .pattern(new RegExp("^[a-zA-Z]+$"))
      .required(),
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
    gender: Joi.string().valid("male", "female"),
    birth_date: Joi.date().less(new Date("2005-01-01")),
    birth_year: Joi.number().integer().min(1980).max(2005),
    referred: Joi.boolean().required(),
    referralDetails: Joi.string().when("referred", {
      is: true,
      then: Joi.string().min(3).required(),
      otherwise: Joi.optional,
    }),
    coding_lang: Joi.array().items(Joi.string(), Joi.object()),
    is_active: Joi.boolean().truthy("Yes").valid(true),
  });
  return schema.validate(data, { abortEarly: false });
};
