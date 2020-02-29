const { GraphQLNode } = require("idio-graphql");
const gql = require("graphql-tag");

const Comment = new GraphQLNode({
    name: "Comment",
    typeDefs: gql`
        type Comment {
            _id: ID!
            createdAt: String!
            updatedAt: String!
            body: String
            author: User
            article: Article
        }
    `
});

module.exports = Comment;
