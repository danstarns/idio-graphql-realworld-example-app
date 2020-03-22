function viewer(root, args, { user }) {
    return { user: { _id: user } };
}

module.exports = viewer;
