const { Article, User } = require("../../../../models/index.js");

async function unfavoriteArticle(root, { input: { id } }, { user }) {
    try {
        const article = await Article.findById(id).lean();

        if (!article) {
            throw new Error(/* article: null */);
        }

        await User.findByIdAndUpdate(user, {
            $pull: { "favorites.articles": article._id }
        });

        return {
            article
        };
    } catch (error) {
        return {
            article: null
        };
    }
}

module.exports = unfavoriteArticle;
