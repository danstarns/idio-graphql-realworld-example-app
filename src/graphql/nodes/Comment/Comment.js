const { GraphQLNode } = require("idio-graphql");
const path = require("path");
const Mutation = require("./Mutation/index.js");
const Fields = require("./Fields/index.js");

const Comment = new GraphQLNode({
    name: "Comment",
    typeDefs: path.join(__dirname, "./Comment.gql"),
    resolvers: {
        Mutation,
        Fields
    }
});

module.exports = Comment;
