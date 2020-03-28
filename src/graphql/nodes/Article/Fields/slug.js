function slug({ title, _id, id }) {
    return `${title}-${_id || id}`;
}

module.exports = slug;
