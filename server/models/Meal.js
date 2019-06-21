const mongoose = require("mongoose");
const Joi = require("joi");

const weekSchema = new mongoose.Schema({
  week: {
    required: true,
    type: Number
  },
  Monday: {
    type: ["String"]
  },
  Tuesday: {
    type: ["String"]
  },
  Wednesday: {
    type: ["String"]
  },
  Thursday: {
    type: ["String"]
  },
  Friday: {
    type: ["String"]
  },
  Saturday: {
    type: ["String"]
  },
  Sunday: {
    type: ["String"]
  }
});

const mealSchema = new mongoose.Schema({
  meal: {
    type: [weekSchema],
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const Meal = mongoose.model("meals", mealSchema);

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

module.exports.Meal = Meal;
module.exports.validate = validate;
