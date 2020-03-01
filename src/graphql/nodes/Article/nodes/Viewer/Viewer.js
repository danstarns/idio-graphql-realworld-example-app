const { GraphQLNode } = require("idio-graphql");
const path = require("path");

const Viewer = new GraphQLNode({
    name: "Viewer",
    typeDefs: path.join(__dirname, "./Viewer.gql"),
    resolvers: {
        Query: {
            viewer: () => true
        }
    }
});

module.exports = Viewer;
