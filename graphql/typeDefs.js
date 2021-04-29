const { gql } = require("apollo-server");

module.exports = gql`
  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    id: ID!
    username: String!
    createdAt: String!
    token: String
    imageUrl: String
    latestMessage: Message
  }

  # This "deleteUserFeedback" type defines what returns when a user is deleted.
  type deleteUserFeedback {
    id: ID!
    message: String
  }

  # This "Message" type defines the queryable fields for every message in our data source.
  type Message {
    id: ID!
    content: String!
    to: String!
    from: String!
    createdAt: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  type Query {
    getUsers: [User]!
    login(username: String!, password: String!): User!
    getMessages(from: String!): [Message]!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      passconf: String!
    ): User!

    deleteUser(id: ID!): deleteUserFeedback!

    sendMessage(to: String!, content: String!): Message!
  }
`;
