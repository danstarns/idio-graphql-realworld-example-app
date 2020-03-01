const { combineNodes } = require("idio-graphql");
const { ApolloServer, gql } = require("apollo-server");
const nodes = require("./nodes/index.js");
const debug = require("../debug.js")("GraphQL: ");
const { PORT } = require("../config.js");
const scalars = require("./scalars/index.js");

const { typeDefs, resolvers } = combineNodes(nodes, {
    scalars,
    schemaGlobals: gql`
        type PageInfo {
            endCursor: String
            hasNextPage: Boolean!
            hasPreviousPage: Boolean!
            startCursor: String
        }

        type Query {
            tags: [String!]!
        }
    `
});

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        ...resolvers,
        Query: { ...resolvers.Query, tags: () => ["Array of tags TBA @TODO"] }
    }
});

async function start() {
    debug(`Starting Server`);

    await server.listen(PORT);

    debug(`Started on http://localhost:${PORT}/graphql`);
}

module.exports = { start };