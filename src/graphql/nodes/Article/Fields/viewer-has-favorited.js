const { User } = require("../../../../models/index.js");

async function viewerHasFavorited({ _id }, args, { user: userId }) {
    const user = await User.findById(userId).lean();

    if (user.favorites.articles.map(String).includes(String(_id))) {
        return true;
    }

    return false;
}

module.exports = viewerHasFavorited;
