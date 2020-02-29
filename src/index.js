const api = require("./api/index.js");
const graphql = require("./graphql/index.js");

async function main() {
    try {
        const { execute } = graphql;

        await api.start({ execute });
    } catch (error) {
        console.error(error);

        process.exit(1);
    }
}

main();
