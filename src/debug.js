const debug = require("debug");

const prefix = "@idio-graphql:";

/**
 * @param {string} namespace
 */
function createComponent(namespace) {
    return debug(`${prefix}${namespace}`);
}

module.exports = createComponent;
