const { Article } = require("../../../../models/index.js");

async function articles(root, { input }, { user }) {
    const { first = 10, after = "1", tag, forUser } = input;

    const query = {};

    if (tag) {
        query.tagList = tag;
    }

    if (forUser) {
        query.author = { $in: user.following };
    }

    const pagination = {
        limit: Number(first) || 50,
        page: Number(after),
        sort: {
            createdAt: "descending"
        },
        lean: true
    };

    const { docs, hasNextPage } = await Article.paginate(query, pagination);

    return {
        edges: [
            docs.map(doc => ({
                cursor: doc._id,
                node: doc
            }))
        ],
        pageInfo: {
            endCursor: hasNextPage ? String(Number(after) + 1) : null,
            hasNextPage
        }
    };
}

module.exports = articles;
