const Joi = require("joi");

const signupSchema = Joi.object({
  username: Joi.string().required(),
  fullName: Joi.string().required(),
  email: Joi.string().max(30).required(),
  phone: Joi.string().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  username: Joi.string(),
  email: Joi.string(),
  password: Joi.string().min(8).required(),
}).or("email", "username");

const validateSignupData = (data) => {
  let { error: err, value } = signupSchema.validate(data);
  return { err, value };
};

const validateSignupMiddleware = (req, res, next) => {
  try {
    let { error, value } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues 1",
    });
  }
};

const validateLoginMiddleware = (req, res, next) => {
  try {
    let { error, value } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues 2",
    });
  }
};

const validatePasswordChangeMiddleware = (req, res, next) => {
  try {
    let { error, value } = passwordChangeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues 3",
    });
  }
  save();
};

module.exports = {
  validateSignupData,
  validateSignupMiddleware,
  validateLoginMiddleware,
  validatePasswordChangeMiddleware,
};
