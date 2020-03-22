const { combineNodes } = require("idio-graphql");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const { express: voyagerMiddleware } = require("graphql-voyager/middleware");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodes = require("./nodes/index.js");
const debug = require("../debug.js")("GraphQL: ");
const { PORT, NODE_ENV } = require("../config.js");
const appliances = require("./appliances/index.js");
const { decodeJWT } = require("../util/index.js");

const { typeDefs, resolvers } = combineNodes(nodes, appliances);

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: NODE_ENV === "develop",
    context: async ({ req, res }) => {
        const authorization = req.header("authorization");

        if (!authorization) {
            return { user: null, req, res };
        }

        const [, jwt] = authorization.split("Token ");

        const { sub } = await decodeJWT(jwt);

        return {
            req,
            res,
            user: sub
        };
    }
});

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
