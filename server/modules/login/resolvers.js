import { User } from "../../models/User";
import { createTokens } from "../../auth";
import bcrypt from "bcrypt";

const resolver = {
  Mutation: {
    login: async (_, { email, password }, { res }) => {
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
      const { accessToken, refreshToken } = createTokens(user);
      res.cookie("refresh-token", refreshToken);
      res.cookie("access-token", accessToken);

      return {
        ok: true,
        error: ""
      };
    },
    invalidateTokens: async (_, __, { req }) => {
      if (!req.userId) {
        return false;
      }
      const user = await User.findById(req.userId);
      if (!user) {
        return false;
      }

      user.count += 1;
      await user.save();
      return true;
    }
  }
};

module.exports = resolver;
