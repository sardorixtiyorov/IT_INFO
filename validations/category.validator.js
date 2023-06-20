const Joi = require("joi");

const categorySchema = Joi.object({
  category_name: Joi.string()
    .min(2)
    .message("Category name should be at least 2 characters long")
    .max(255)
    .message("Category name should be less than 255 characters long")
    .required(),
  parent_category_id: Joi.string().alphanum(),
});

module.exports=categorySchema