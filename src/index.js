const api = require("./api/index.js");
// const graphql = require("./graphql/index.js");
const debug = require("./debug.js")("App: ");
const mongodb = require("./mongodb.js");

async function main() {
    debug("Starting");

    try {
        const { execute } = {};

        await mongodb.start();

        await api.start({ execute });
    } catch (error) {
        console.error(error);

        process.exit(1);
    }

    debug("Started");
}

main();
