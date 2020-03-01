const { combineNodes } = require("idio-graphql");
const { ApolloServer } = require("apollo-server");
const nodes = require("./nodes/index.js");
const debug = require("../debug.js")("GraphQL: ");
const { PORT } = require("../config.js");

const { typeDefs, resolvers } = combineNodes(nodes);

const server = new ApolloServer({
    typeDefs,
    resolvers
});

async function start() {
    debug(`Starting Server`);

    await server.listen(PORT);

    debug(`Started on http://localhost:${PORT}/graphql`);
}

module.exports = { start };
