const { Article } = require("../../../../models/index.js");

async function articles(root, { input }, { user }) {
    const { first = 10, after = "0", tag, forUser } = input;

    const pagination = {
        limit: Number(first) || 50,
        page: after ? Number(after) + 1 : 1,
        sort: {
            createdAt: "descending"
        },
        lean: true
    };

    const query = {};

    if (tag) {
        query.tagList = tag;
    }

    if (forUser) {
        query.author = { $in: user.following };
    }

    const { docs, totalPages, hasNextPage } = await Article.paginate(
        query,
        pagination
    );

    return {
        edges: [
            docs.map(doc => ({
                cursor: doc._id,
                node: doc
            }))
        ],
        pageInfo: {
            endCursor: String(totalPages),
            hasNextPage
        }
    };
}

module.exports = articles;
