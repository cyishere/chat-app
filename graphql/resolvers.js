const bcrypt = require("bcrypt");
const { UserInputError } = require("apollo-server");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves users from the "users" array above.
module.exports = {
  Query: {
    getUsers: async (_, __, { prisma }) => {
      const users = await prisma.user.findMany();

      return users;
    },
  },

  Mutation: {
    register: async (_, args, { prisma }) => {
      const { username, email, password, passconf } = args;
      let errors = {};

      try {
        // TODO validate input data
        if (username.trim() === "")
          errors.username = "Username must not be empty.";
        if (email.trim() === "") errors.email = "Email must not be empty.";
        if (password.trim() === "")
          errors.password = "Password must not be empty.";
        if (passconf.trim() !== password.trim())
          errors.passconf = "Passwords must match.";

        // TODO check if username / email exist
        const findUserByName = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        const findUserByEmail = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (findUserByName) errors.username = "This username is already taken.";
        if (findUserByEmail) errors.email = "This email is already taken.";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // create user
        const user = await prisma.user.create({
          data: {
            username,
            email,
            password: hashedPassword,
            updatedAt: new Date(),
          },
        });

        // return user
        return user;
      } catch (err) {
        console.log(err);
        throw new UserInputError("Bad Request", err);
      }
    },
    deleteUser: async (_, { id }, { prisma }) => {
      try {
        const deletedUser = await prisma.user.delete({
          where: {
            id: +id,
          },
        });

        return { id: deletedUser.id, message: "User successfully deleted!" };
      } catch (err) {
        console.log(err.meta.cause);
        throw new UserInputError("User Not Found", err);
      }
    },
  },
};
