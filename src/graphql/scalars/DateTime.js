const { IdioScalar } = require("idio-graphql");
const { GraphQLDateTime } = require("graphql-iso-date");

const DateTime = new IdioScalar({
    name: "DateTime",
    resolver: GraphQLDateTime
});

module.exports = DateTime;
