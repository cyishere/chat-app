const { gql } = require("apollo-server");

module.exports = gql`
  # This "User" type defines the queryable fields for every user in our data source.
  type User {
    username: String!
    email: String!
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "users" query returns an array of zero or more Users (defined above).
  type Query {
    users: [User]
  }
`;
