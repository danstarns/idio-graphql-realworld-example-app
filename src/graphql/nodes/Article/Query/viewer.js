function viewer(root, args, { user }) {
    if (!user) {
        return null;
    }

    return { user: { id: user } };
}

module.exports = viewer;
