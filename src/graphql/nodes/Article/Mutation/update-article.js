const { Article } = require("../../../../models/index.js");

async function updateArticle(root, { input }) {
    const UpdateArticlePayload = { article: null, errors: [] };

    const { id, ...updates } = input;

    console.log("updateArticle", updates);
    try {
        const article = await Article.findByIdAndUpdate(id, updates, {
            new: true
        });

        return {
            ...UpdateArticlePayload,
            article
        };
    } catch (error) {
        console.error(error);
        return {
            article: null
        };
    }
}

module.exports = updateArticle;
