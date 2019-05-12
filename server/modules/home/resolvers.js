import { User } from "../../models/User";

const resolver = {
  Query: {
    getAllUsers: async () => {
      const users = await User.find({});
      return users;
    }
  }
};

module.exports = resolver;
