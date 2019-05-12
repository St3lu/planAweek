import { User, validate } from "../../models/User";
import bcrypt from "bcrypt";

const resolver = {
  Mutation: {
    register: async (_, { name, email, password }) => {
      try {
        const result = await validate({ username: name, email, password });
        if (result.error) {
          return { ok: false, error: result.error.details[0].message };
        }

        const hash = await bcrypt.hash(password, 10);

        const user = new User({
          email,
          password: hash,
          username: name
        });

        const existantEmail = await User.findOne({ email: email });

        if (existantEmail) {
          return {
            ok: false,
            error: "Email already in use"
          };
        }

        await user.save();

        return {
          ok: true
        };
      } catch (err) {
        console.log(err);
        return {
          ok: false,
          error: "You need to provide good information"
        };
      }
    }
  }
};

module.exports = resolver;
