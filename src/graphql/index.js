const { combineNodes } = require("idio-graphql");
const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const { express: voyagerMiddleware } = require("graphql-voyager/middleware");
const nodes = require("./nodes/index.js");
const debug = require("../debug.js")("GraphQL: ");
const { PORT, NODE_ENV } = require("../config.js");
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
    },
    playground: NODE_ENV === "develop"
});

const app = express();

server.applyMiddleware({ app });

function start() {
    return new Promise((resolve, reject) => {
        debug(`Starting Server`);

        if (NODE_ENV === "develop") {
            app.use("/voyager", voyagerMiddleware({ endpointUrl: "/graphql" }));

            debug(`Started Playground @ http://localhost:${PORT}/graphql`);
            debug(`Started Voyager @ http://localhost:${PORT}/voyager`);
        }

        app.listen(PORT, err => {
            if (err) {
                return reject(err);
            }

            debug(`Started @ http://localhost:${PORT}/graphql`);

            return resolve();
        });
    });
}

module.exports = { start };
