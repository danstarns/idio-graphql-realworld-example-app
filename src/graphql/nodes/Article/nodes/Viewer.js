const { GraphQLNode } = require("idio-graphql");
const gql = require("graphql-tag");

const Viewer = new GraphQLNode({
    name: "Viewer",
    typeDefs: gql`
        type Viewer {
            feed(
                first: Int
                after: String
                last: Int
                before: String
            ): ArticleConnection!

            user: User!
        }

        type Query {
            viewer: Viewer
        }
    `,
    resolvers: {
        Query: {
            viewer: () => true
        }
    }
});

module.exports = Viewer;
