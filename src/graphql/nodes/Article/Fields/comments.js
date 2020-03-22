function comments({ _id }, args, { injections: { DataLoaders } }) {
    return DataLoaders.comments.load(_id);
}

module.exports = comments;
