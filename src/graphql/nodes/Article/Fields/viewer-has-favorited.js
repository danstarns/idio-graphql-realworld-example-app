const { User } = require("../../../../models/index.js");

async function viewerHasFavorited({ id }, args, { user: userId }) {
    const user = await User.findById(userId).lean();

    if (user.favorites.articles.map(x => x.toString()).includes(id)) {
        return true;
    }

    return false;
}

module.exports = viewerHasFavorited;
