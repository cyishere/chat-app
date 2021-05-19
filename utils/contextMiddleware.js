const { PubSub } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./config");

const pubsub = new PubSub();
const prisma = new PrismaClient();

module.exports = (context) => {
  let token;

  if (context.req && context.req.headers.authorization) {
    token = context.req.headers.authorization.split(" ")[1];
  } else if (context.connection && context.connection.context.Authorization) {
    token = context.connection.context.Authorization.split(" ")[1];
  }

  if (token) {
    context.user = jwt.verify(token, APP_SECRET);
  }

  return {
    ...context,
    prisma,
    pubsub,
  };
};
