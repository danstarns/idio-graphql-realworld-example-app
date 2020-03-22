const { GraphQLNode } = require("idio-graphql");
const path = require("path");
const { AuthenticationError } = require("apollo-server-express");
const { User, Article } = require("../../../../../models/index.js");

async function feed(root, { first, after }) {
    const { user } = root;

    if (!user) {
        throw new AuthenticationError("not authorized");
    }

    const followers = await User.find({
        _id: { $in: user.followers }
    }).select("_id");

    const articles = await Article.paginate(
        {
            author: { $in: followers.map(x => x._id) }
        },
        {
            limit: Number(first) || 50,
            page: after ? Number(after) + 1 : 1,
            sort: {
                createdAt: "descending"
            },
            lean: true
        }
    );

    const { docs, totalPages, hasNextPage } = articles;

    return {
        edges: [
            docs.map(doc => {
                const { _id, ...restOfDoc } = doc;

                return {
                    cursor: _id,
                    node: {
                        id: _id,
                        ...restOfDoc
                    }
                };
            })
        ],
        pageInfo: {
            endCursor: String(totalPages),
            hasNextPage
        }
    };
}

const Viewer = new GraphQLNode({
    name: "Viewer",
    typeDefs: path.join(__dirname, "./Viewer.gql"),
    resolvers: {
        Query: {
            viewer: async (root, args, { user }) => ({
                user: await User.findById(user)
            })
        },
        Fields: {
            feed
        }
    }
});

module.exports = Viewer;
