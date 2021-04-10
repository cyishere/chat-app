// const { AuthenticationError } = require("apollo-server");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = require("./config");

const prisma = new PrismaClient();

module.exports = (context) => {
  let user;

  if (context.req && context.req.headers.authorization) {
    const token = context.req.headers.authorization.split(" ")[1];
    user = jwt.verify(token, APP_SECRET);
  }

  return {
    ...context,
    user,
    prisma,
  };
};
