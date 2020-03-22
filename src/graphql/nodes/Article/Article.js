const { GraphQLNode } = require("idio-graphql");
const path = require("path");
const nodes = require("./nodes/index.js");
const Query = require("./Query/index.js");
const Mutation = require("./Mutation/index.js");
const Fields = require("./Fields/index.js");
const DataLoaders = require("./DataLoaders/index.js");

const Article = new GraphQLNode({
    name: "Article",
    injections: { DataLoaders },
    nodes,
    typeDefs: path.join(__dirname, "./Article.gql"),
    resolvers: {
        Query,
        Mutation,
        Fields
    }
});

module.exports = Article;
