const bcrypt = require("bcrypt");
const { UserInputError, AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("../../utils/config");

module.exports = {
  Query: {
    getUsers: async (_, __, { user, prisma }) => {
      try {
        if (!user) throw new AuthenticationError("You need to login.");

        const users = await prisma.user.findMany({
          where: {
            username: {
              not: user.username,
            },
          },
        });

        return users;
      } catch (err) {
        console.log(err);

        throw new AuthenticationError(err.message);
      }
    },
    login: async (_, args, { prisma }) => {
      const { username, password } = args;
      let errors = {};

      try {
        if (username.trim() === "")
          errors.username = "Username must not be empty.";
        if (password === "") errors.password = "Password must not be empty.";

        if (Object.keys(errors).length > 0) {
          throw errors;
        }

        const user = await prisma.user.findUnique({
          where: {
            username,
          },
        });

        if (!user) {
          errors.username = "User not found";
          throw errors;
        }

        const passwordIsCorrect = await bcrypt.compare(password, user.password);

        if (!passwordIsCorrect) {
          errors.password = "Password is wrong";
          throw errors;
        }

        const token = jwt.sign({ username }, APP_SECRET, {
          expiresIn: 60 * 60,
        });

        return {
          ...user,
          createdAt: user.createdAt.toISOString(),
          token,
        };
      } catch (error) {
        console.log(error);
        throw new UserInputError("Bad Request", { errors });
      }
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
        if (password === "") errors.password = "Password must not be empty.";
        if (passconf !== password) errors.passconf = "Passwords must match.";

        // check if the right email syntax
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
