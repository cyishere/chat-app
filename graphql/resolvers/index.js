const userResolvers = require("./user");
const messageResolvers = require("./message");

module.exports = {
  Query: {
    ...userResolvers.Query,
    ...messageResolvers.Query,
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...messageResolvers.Mutation,
  },
};
