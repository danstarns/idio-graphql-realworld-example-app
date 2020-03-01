const { GraphQLNode } = require("idio-graphql");
const path = require("path");
const nodes = require("./nodes/index.js");
const Query = require("./Query/index.js");
const Mutation = require("./Mutation/index.js");

const Article = new GraphQLNode({
    name: "Article",
    nodes,
    typeDefs: path.join(__dirname, "./Article.gql"),
    resolvers: {
        Query,
        Mutation
    }
});

module.exports = Article;
