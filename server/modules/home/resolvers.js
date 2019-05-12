import { User } from "../../models/User";

const resolver = {
  Query: {
    getAllUsers: async () => {
      const users = await User.find({});
      return users;
    },
    me: async (_, __, { req }) => {
      if (!req.userId) {
        return null;
      }

      return User.findById(req.userId);
    }
  }
};

module.exports = resolver;
