const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Query: {
    getMessages: async (_, { from }, { user, prisma }) => {
      try {
        if (!user) throw new AuthenticationError("You need to login.");

        const otherUser = await prisma.user.findUnique({
          where: { username: from },
        });

        if (!otherUser) throw new UserInputError("User not found.");

        const usernames = [user.username, from];

        const messages = await prisma.message.findMany({
          where: {
            from: { in: usernames },
            to: { in: usernames },
          },
          orderBy: {
            createdAt: "asc",
          },
        });

        return messages;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Mutation: {
    sendMessage: async (_, { to, content }, { user, prisma, pubsub }) => {
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

        pubsub.publish("NEW_MESSAGE", {
          newMessage: message,
        });

        return message;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: (_, __, { pubsub, user }) => {
        if (!user) throw new AuthenticationError("Unauthenticated");
        return pubsub.asyncIterator(["NEW_MESSAGE"]);
      },
    },
  },
};
