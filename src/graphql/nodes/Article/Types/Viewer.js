const { GraphQLType } = require("idio-graphql");
const { gql } = require("apollo-server-express");
const { User } = require("../../../../models/index.js");

const Viewer = new GraphQLType({
    name: "Viewer",
    typeDefs: gql`
        type Viewer {
            feed(first: Int, after: String): ArticleConnection!
            user: User!
        }
    `,
    resolvers: {
        feed: async (root, { input }, { user, injections: { execute } }) => {
            const { first, after } = input;

            const { data, errors } = await execute(
                gql`
                {
                    articles(
                        first: ${first}
                        after: "${after}"
                        forUser: true
                    ) {
                        edges {
                            id
                            slug
                            title
                            description
                            favoritesCount
                            createdAt
                            viewerHasFavorited
                            favoritesCount
                            author {
                              id
                              username
                              image
                            }
                        }
                        pageInfo {
                            endCursor
                            hasNextPage
                        }
                    }
                }
            `,
                { context: { user } }
            );

            if (errors && errors.length) {
                throw new Error(errors[0].message);
            }

            return data.articles;
        },
        user: ({ user: { _id } }) => User.findById(_id).lean()
    }
});

module.exports = Viewer;
