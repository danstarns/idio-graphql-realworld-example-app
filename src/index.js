const debug = require("./debug.js")("App: ");
const mongodb = require("./mongodb.js");
const graphql = require("./graphql/index.js");

async function main() {
    debug("Starting");

    try {
        await mongodb.start();

        await graphql.start();
    } catch (error) {
        console.error(error);

        process.exit(1);
    }

    debug("Started");
}

main();
