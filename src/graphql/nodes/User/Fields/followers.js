const { User } = require("../../../../models/index.js");

async function followers(root, args, { injections: { DataLoaders } }) {
    const found = await DataLoaders.users.load(root.id);

    const totalCount = await User.countDocuments({ following: found.id });

    return { totalCount };
}

module.exports = followers;
