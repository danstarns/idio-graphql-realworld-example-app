const { User } = require("../../../../models/index.js");

async function followers(root, args, { injections: { DataLoaders } }) {
    const found = await DataLoaders.users.load(root._id.toString());

    const totalCount = await User.countDocuments({ following: found._id });

    return { totalCount };
}

module.exports = followers;
