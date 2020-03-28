const { User } = require("../../../../models/index.js");

async function favoritesCount({ id }) {
    const count = await User.count({ "favorites.articles": id });

    return count;
}

module.exports = favoritesCount;
