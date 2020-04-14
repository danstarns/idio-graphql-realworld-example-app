const { createTestClient } = require("apollo-server-testing");
const { combineNodes } = require("idio-graphql");
const { ApolloServer } = require("apollo-server-express");
const nodes = require("../src/graphql/nodes/index.js");
const appliances = require("../src/graphql/appliances/index.js");

const { typeDefs, resolvers, schemaDirectives } = combineNodes(
    nodes,
    appliances
);

function graphql({ user } = {}) {
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        schemaDirectives,
        context: () => ({ user })
    });

    const client = createTestClient(server);

    return client;
}

module.exports = graphql;
