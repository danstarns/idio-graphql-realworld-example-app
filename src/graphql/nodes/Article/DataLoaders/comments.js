const DataLoader = require("dataloader");
const { Comment } = require("../../../../models/index.js");

const commentsLoader = new DataLoader(async articleIds => {
    const comments = await Comment.find({
        article: { $in: articleIds.map(String) }
    }).lean();

    return articleIds.map(_id =>
        comments.filter(x => String(x.article) === String(_id))
    );
});

module.exports = commentsLoader;
