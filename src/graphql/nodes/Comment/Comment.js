const { GraphQLNode } = require("idio-graphql");
const gql = require("graphql-tag");
const Mutation = require("./Mutation/index.js");

const Comment = new GraphQLNode({
    name: "Comment",
    typeDefs: gql`
        type Comment {
            id: ID!
            article: Article
            author: User
            body: String!
            createdAt: DateTime!
            updatedAt: DateTime!
        }

        input AddCommentInput {
            articleId: ID!
            body: String!
            clientMutationId: String
        }

        type AddCommentPayload {
            clientMutationId: String
            comment: Comment
            errors: [UserError!]!
        }

        input DeleteCommentInput {
            id: ID!
            clientMutationId: String
        }

        type DeleteCommentPayload {
            clientMutationId: String
            comment: Comment
        }

        type Mutation {
            addComment(input: AddCommentInput!): AddCommentPayload
            deleteComment(input: DeleteCommentInput!): DeleteCommentPayload
        }
    `,
    resolvers: {
        Mutation
    }
});

module.exports = Comment;
