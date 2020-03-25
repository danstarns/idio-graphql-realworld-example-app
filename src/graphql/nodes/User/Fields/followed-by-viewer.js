const { User } = require("../../../../models/index.js");

async function favoriteArticles(root, args, { user: userId }) {
    const user = await User.findById(userId).lean();

    if (user.favorites.articles.includes(root._id)) {
        return true;
    }

    return false;
}

module.exports = favoriteArticles;
