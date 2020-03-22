const { GraphQLNode } = require("idio-graphql");
const path = require("path");
const Query = require("./Query/index.js");
const Mutation = require("./Mutation/index.js");
const Fields = require("./Fields/index.js");
const DataLoaders = require("./DataLoaders/index.js");
const Types = require("./Types/index.js");

const Article = new GraphQLNode({
    name: "Article",
    injections: { DataLoaders },
    typeDefs: path.join(__dirname, "./Article.gql"),
    resolvers: {
        Query,
        Mutation,
        Fields
    },
    types: Types
});

module.exports = Article;
