function author({ user }, args, { injections: { DataLoaders } }) {
    return DataLoaders.authors.load(user);
}

module.exports = author;
