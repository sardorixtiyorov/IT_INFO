const Validators = require("../validations");

module.exports = function (validator) {
  if (!Validators.hasOwnProperty(validator))
    throw new Error(`${validator} validator is not exist`);
  return async function (req, res, next) {
    try {
      const validated = await Validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (error) {
      if (error.isJoi) {
        return res.status(400).send({
          message: error.message,
          friendlyMsg: "Validation error",
        });
      }
      return res.status(500).send({
        message: error.message,
        friendlyMsg: "Internal Server Error",
      });
    }
  };
};
