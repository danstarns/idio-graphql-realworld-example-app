async function comments({ _id }, args, { injections: { DataLoaders } }) {
    const result = await DataLoaders.comments.load(_id);

    if (!result) {
        return [];
    }

    return result;
}

module.exports = comments;
