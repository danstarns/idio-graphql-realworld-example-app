const debug = require("debug");

const prefix = "@idio-graphql:";

/**
 * @param {string} namespace
 *
 * @returns {import('debug').Debug}
 */
function createComponent(namespace) {
    return debug(`${prefix}${namespace}`);
}

module.exports = createComponent;
