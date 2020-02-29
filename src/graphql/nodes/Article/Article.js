const { GraphQLNode } = require("idio-graphql");
const gql = require("graphql-tag");

const Article = new GraphQLNode({
    name: "Article",
    typeDefs: gql`
        type Article {
            _id: ID!
            createdAt: String!
            updatedAt: String!
            slug: String
            title: String
            description: String
            body: String
            favoritesCount: Int
            comments: [Comment]
            tagList: [String]
            author: User
        }
    `
});

module.exports = Article;
