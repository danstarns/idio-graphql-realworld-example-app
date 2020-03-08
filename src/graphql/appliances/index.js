const path = require("path");
const scalars = require("./scalars/index.js");

module.exports = {
    scalars,
    schemaGlobals: path.join(__dirname, "./schema-globals.gql")
};
