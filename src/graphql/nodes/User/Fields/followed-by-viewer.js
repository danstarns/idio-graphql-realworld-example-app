const { User } = require("../../../../models/index.js");

async function followedByViewer(root, args, { user: userId }) {
    const user = await User.findById(userId).lean();

    if (!user) {
        return false;
    }

    const userFollowers = user.following.map(x => x.toString());

    if (userFollowers.includes(root._id.toString())) {
        return true;
    }

    return false;
}

module.exports = followedByViewer;
