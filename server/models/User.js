const mongoose = require("mongoose");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  email: {
    required: true,
    type: String
  },
  username: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 25
  },
  password: {
    required: true,
    type: String,
    minlength: 3,
    maxlength: 100
  },
  count: {
    required: true,
    type: Number,
    default: 0
  }
});

const User = mongoose.model("users", userSchema);

const validate = user => {
  const schema = {
    email: Joi.string().required(),
    username: Joi.string()
      .required()
      .min(3)
      .max(25),
    password: Joi.string()
      .required()
      .min(3)
      .max(100)
  };

  const result = Joi.validate(user, schema);
  return result;
};

module.exports.User = User;
module.exports.validate = validate;
