const Joi = require("joi");

exports.adminValidation = (data) => {
  const schema = Joi.object({
    admin_name: Joi.string().min(3).max(50),
    admin_email: Joi.string().email(),
    admin_password: Joi.string().min(6).max(20),
    confirm_password: Joi.ref("admin_password"),
    admin_is_active: Joi.boolean().default(false),
    admin_is_creator: Joi.boolean().default(false),
  });
  return schema.validate(data, { abortEarly: false });
};
