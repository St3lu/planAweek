import { User } from "../../models/User";
import bcrypt from "bcrypt";

const resolver = {
  Mutation: {
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        return {
          ok: false,
          error: "There is no user with such an email"
        };
      }

      const passMatch = await bcrypt.compare(password, user.password);
      if (!passMatch) {
        return {
          ok: false,
          error: "Your email and password don't match"
        };
      }
      return {
        ok: true,
        error: ""
      };
    }
  }
};

module.exports = resolver;
