const { Article } = require("../../../../models/index.js");

async function deleteArticle(root, { input }) {
    try {
        const user = await Article.findByIdAndRemove(input.id);

        return {
            user
        };
    } catch (error) {
        return {
            user: null
        };
    }
}

module.exports = deleteArticle;
