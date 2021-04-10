const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    sendMessage: async (_, { to, content }, { user, prisma }) => {
      try {
        if (!user) throw new AuthenticationError("You need to login.");

        const recipient = await prisma.user.findUnique({
          where: {
            username: to,
          },
        });

        if (!recipient) {
          throw new UserInputError("User not found.");
        } else if (recipient.username === user.username) {
          throw new UserInputError("You can't message yourself.");
        }

        if (content.trim() === "")
          throw new UserInputError("Message is empty.");

        const message = await prisma.message.create({
          data: {
            content,
            from: user.username,
            to,
          },
        });

        return message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
};
