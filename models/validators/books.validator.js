const Joi = require("joi");

const createBooksChangeSchema = Joi.object({
  title: Joi.string().min(3).required(),
  author: Joi.string().min(3).required(),
  price: Joi.string().min(2).required(),
  description: Joi.string().min(8).required(),
});

const validatecreateBooksChangeSchema = (req, res, next) => {
  try {
    let { error, value } = createBooksChangeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues",
    });
  }
};

const updateBooksChangeSchema = Joi.object({
  title: Joi.string().min(3).required(),
  price: Joi.string().min(2).required(),
  description: Joi.string().min(4).required(),
  author: Joi.string().min(8),
  year: Joi.string().min(4),
});

const validateupdateBooksChangeSchema = (req, res, next) => {
  try {
    let { error, value } = updateBooksChangeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error,
      });
    }
    // console.log(value);
    next();
  } catch (err) {
    return res.status(500).json({
      message: "server issues",
    });
  }
};

module.exports = {
  validatecreateBooksChangeSchema,
  validateupdateBooksChangeSchema,
};
