const { User } = require("../../../../models/index.js");

async function favoritesCount({ id, _id }) {
    const count = await User.find({ "favorites.articles": id || _id }).count();

    return count;
}

module.exports = favoritesCount;
