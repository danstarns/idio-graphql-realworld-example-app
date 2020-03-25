function viewer(root, args, { user }) {
    if (!user) {
        return null;
    }

    return { user: { _id: user } };
}

module.exports = viewer;
