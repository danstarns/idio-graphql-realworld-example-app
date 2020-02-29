const { GraphQLNode } = require("idio-graphql");
const gql = require("graphql-tag");

const User = new GraphQLNode({
    name: "User",
    typeDefs: gql`
        type User {
            _id: ID!
            createdAt: String!
            updatedAt: String!
            username: String!
            email: String!
            bio: String
            image: String
            favorites: [Article]
            following: [User]
            hash: String
            salt: String
        }
    `
});

module.exports = User;
