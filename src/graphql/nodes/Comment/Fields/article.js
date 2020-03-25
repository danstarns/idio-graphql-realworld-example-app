const { Article } = require("../../../../models/index.js");

async function article({ article: articleID }) {
    return Article.findById(articleID);
}

module.exports = article;
