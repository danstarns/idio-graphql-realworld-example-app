/* eslint-disable camelcase */
const { User } = require("../../../../models/index.js");

async function viewerHasFavorited({ id, _id }, args, { user: userId }) {
    const user = await User.findById(userId).lean();

    if (!user) {
        return false;
    }

    const articles = user.favorites.articles.map(x => x.toString());

    let includesId;
    let includes_Id;

    if (id) {
        includesId = articles.includes(id);
    }

    if (_id) {
        includes_Id = articles.includes(_id.toString());
    }

    if (includesId || includes_Id) {
        return true;
    }

    return false;
}

module.exports = viewerHasFavorited;
