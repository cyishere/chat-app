// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves users from the "users" array above.
module.exports = {
  Query: {
    getUsers: async (_, __, { prisma }) => {
      const users = await prisma.user.findMany();

      return users;
    },
  },
};
