const { User } = require("../../../../models/index.js");

async function favoritesCount({ id, _id }) {
    const count = await User.countDocuments({
        "favorites.articles": id || _id
    });

    return count;
}

module.exports = favoritesCount;
