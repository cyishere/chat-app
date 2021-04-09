const { ApolloServer } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");

const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: (ctx) => ({
    ctx,
    prisma,
  }),
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
