const { Article } = require("../../../../models/index.js");

function article(root, input) {
    const [, id] = input.slug.split("-");

    return Article.findById(id).lean();
}

module.exports = article;
