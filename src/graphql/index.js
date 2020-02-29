const { combineNodes } = require("idio-graphql");
const nodes = require("./nodes/index.js");

module.exports = combineNodes(nodes);
