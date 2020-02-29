const { combineNodes } = require("idio-graphql");
const nodes = require("./nodes/index.js");
const debug = require("../debug.js")("GraphQL: ");

function start() {
    debug("Building Schema...");

    const graphql = combineNodes(nodes);

    debug("Completed");

    return graphql;
}

module.exports = { start };
