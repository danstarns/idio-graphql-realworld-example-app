const { User } = require("../../../../models/index.js");

async function favoritesCount({ _id }) {
    const count = await User.count({ "favorites.articles": _id });

    return count;
}

module.exports = favoritesCount;
