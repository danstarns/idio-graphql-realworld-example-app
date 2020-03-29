const { createTestClient } = require("apollo-server-testing");
const { combineNodes } = require("idio-graphql");
const { ApolloServer } = require("apollo-server-express");
const nodes = require("../src/graphql/nodes/index.js");
const appliances = require("../src/graphql/appliances/index.js");

const { schema } = combineNodes(nodes, appliances);

function test() {
    const server = new ApolloServer({
        schema,
        context: () => ({})
    });

    const client = createTestClient(server);

    return client;
}

module.exports = test;
