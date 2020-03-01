const { GraphQLNode } = require("idio-graphql");
const gql = require("graphql-tag");

const Article = new GraphQLNode({
    name: "Article",
    typeDefs: gql`
        type Article {
            id: ID!
            author: User!
            body: String!
            comments: [Comment!]!
            createdAt: DateTime!
            description: String!
            favoritesCount: Int!
            slug: String!
            tagList: [String!]!
            title: String!
            updatedAt: DateTime!
            viewerHasFavorited: Boolean!
        }

        type ArticleEdge {
            cursor: String!
            node: Article
        }

        type ArticleConnection {
            edges: [ArticleEdge]
            pageInfo: PageInfo!
        }

        type CreateArticlePayload {
            article: Article
            clientMutationId: String
            errors: [UserError!]!
        }

        type DeleteArticlePayload {
            article: Article!
            clientMutationId: String
        }

        input DeleteArticleInput {
            id: ID!
            clientMutationId: String
        }

        input FavoriteArticleInput {
            id: ID!
            clientMutationId: String
        }

        type FavoriteArticlePayload {
            article: Article
            clientMutationId: String
        }

        input UpdateArticleInput {
            id: ID!
            title: String!
            description: String!
            body: String!
            tagList: [String!]!
            clientMutationId: String
        }

        type UpdateArticlePayload {
            article: Article
            clientMutationId: String
            errors: [UserError!]!
        }

        input UnfavoriteArticleInput {
            id: ID!
            clientMutationId: String
        }

        type UnfavoriteArticlePayload {
            article: Article
            clientMutationId: String
        }

        input CreateArticleInput {
            title: String!
            description: String!
            body: String!
            tagList: [String!]!
            clientMutationId: String
        }

        type Query {
            article(slug: String!): Article

            articles(
                first: Int
                after: String
                last: Int
                before: String
                tag: String
                authoredBy: String
                favoritedBy: String
            ): ArticleConnection!
        }

        type Mutation {
            createArticle(input: CreateArticleInput!): CreateArticlePayload
            deleteArticle(input: DeleteArticleInput!): DeleteArticlePayload

            favoriteArticle(
                input: FavoriteArticleInput!
            ): FavoriteArticlePayload

            unfavoriteArticle(
                input: UnfavoriteArticleInput!
            ): UnfavoriteArticlePayload

            updateArticle(input: UpdateArticleInput!): UpdateArticlePayload
        }
    `
});

module.exports = Article;
