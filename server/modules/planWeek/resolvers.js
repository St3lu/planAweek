import { Meal } from "../../models/Meal";

const resolver = {
  Query: {
    getMeals: async (_, { id }) => {
      //TO DELETE
      // const meal = new Meal({
      //   userId: id,
      //   meal: [
      //     {
      //       week: 20,
      //       Monday: ["lol", "account"],
      //       Tuesday: ["success"],
      //       Wednesday: ["hah"]
      //     },
      //     {
      //       week: 21,
      //       Monday: ["fries"],
      //       Tuesday: ["nothing"]
      //     }
      //   ]
      // });
      // await meal.save();
      //TO DELETE

      const meals = await Meal.findOne({ userId: id });

      return meals.meal;
    }
  }
};

module.exports = resolver;
