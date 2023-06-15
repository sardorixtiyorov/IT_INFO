const Joi = require("joi");

exports.userValidation = (data) => {
  const schema = Joi.object({
    user_name: Joi.string().min(3).max(50),
    user_email: Joi.string().email(),
    user_password: Joi.string().min(6).max(20),
    confirm_password: Joi.ref("user_password"),
    user_is_active: Joi.boolean().default(false),
    user_photo: Joi.string().default("../avatar.jpg"),
    user_info: Joi.string().max(255),
  });
  return schema.validate(data, { abortEarly: false });
};
