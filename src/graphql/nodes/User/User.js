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

        input CreateUserInput {
            username: String!
            email: String!
            password: String!
            clientMutationId: String
        }

        type CreateUserPayload {
            clientMutationId: String
            errors: [UserError!]!
            user: Viewer
        }

        input SignInUserInput {
            email: String!
            password: String!
            clientMutationId: String
        }

        type SignInUserPayload {
            clientMutationId: String
            errors: [UserError!]!
            token: String
            viewer: Viewer
        }

        input UnfollowUserInput {
            id: ID!
            clientMutationId: String
        }

        type UnfollowUserPayload {
            clientMutationId: String
            user: User
        }

        input UpdateUserInput {
            email: String!
            username: String!
            bio: String
            image: String
            password: String
            clientMutationId: String
        }

        type UpdateUserPayload {
            clientMutationId: String
            errors: [UserError!]!
            user: User
        }

        type UserEdge {
            cursor: String!
            node: User
        }

        type UserError {
            message: String!
            path: [String!]
        }

        type FollowersConnection {
            edges: [UserEdge]
            nodes: [User]
            pageInfo: PageInfo!
            totalCount: Int!
        }

        input FollowUserInput {
            id: ID!
            clientMutationId: String
        }

        type FollowUserPayload {
            clientMutationId: String
            user: User
        }

        type Query {
            user(username: String!): User
        }

        type Mutation {
            createUser(input: CreateUserInput!): CreateUserPayload
            followUser(input: FollowUserInput!): FollowUserPayload
            signInUser(input: SignInUserInput!): SignInUserPayload
            unfollowUser(input: UnfollowUserInput!): UnfollowUserPayload
            updateUser(input: UpdateUserInput!): UpdateUserPayload
        }
    `
});

module.exports = User;
