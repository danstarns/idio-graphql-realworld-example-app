const { User } = require("../../../../models/index.js");

async function followers(
    root,
    args,
    { user: userId, injections: { DataLoaders } }
) {
    const found = await DataLoaders.users.load(userId);

    const totalCount = await User.countDocuments({ following: found._id });

    return { totalCount };
}

module.exports = followers;
