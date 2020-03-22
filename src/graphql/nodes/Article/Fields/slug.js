function slug({ title, _id }) {
    return `${title}-${_id}`;
}

module.exports = slug;
