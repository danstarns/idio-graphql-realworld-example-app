const { User } = require("../../../../models/index.js");

async function followUser(root, { input: { id } }, { user: requester }) {
    try {
        const user = await User.findById(id).lean();

        if (!user) {
            throw new Error(/* user not found */);
        }

        await User.findByIdAndUpdate(
            requester,
            {
                $addToSet: { following: id }
            },
            { new: true }
        ).lean();

        return {
            user
        };
    } catch (error) {
        return {
            user: null
        };
    }
}

module.exports = followUser;
