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
        // validate input data
        if (username.trim() === "")
          errors.username = "Username must not be empty.";
        if (email.trim() === "") errors.email = "Email must not be empty.";
        if (password.trim() === "")
          errors.password = "Password must not be empty.";
        if (passconf.trim() !== password.trim())
          errors.passconf = "Passwords must match.";

        // TODO check if the right email syntax
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.trim().match(regEx))
          errors.email = "Must be a valid email address.";

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
        if (err.code === "P2002") {
          errors[err.meta.target[0]] = `${err.meta.target[0]} is already taken`;
        }
        throw new UserInputError("Bad Request", { errors });
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
