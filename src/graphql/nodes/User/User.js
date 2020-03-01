const { GraphQLNode } = require("idio-graphql");
const gql = require("graphql-tag");

const User = new GraphQLNode({
    name: "User",
    typeDefs: gql`
        type User {
            id: ID!
            image: String
            username: String!
            bio: String
            email: String!
            followedByViewer: Boolean!

            articles(
                first: Int
                after: String
                last: Int
                before: String
            ): ArticleConnection!

            favoriteArticles(
                first: Int
                after: String
                last: Int
                before: String
            ): ArticleConnection!

            followers(
                first: Int
                after: String
                last: Int
                before: String
            ): FollowersConnection!
        }
    `
});

module.exports = User;
