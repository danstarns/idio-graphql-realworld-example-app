const { User } = require("../../../../models/index.js");

async function unfollowUser(root, { input: { id } }, { user: requester }) {
    try {
        const user = await User.findById(id);

        if (!user) {
            throw new Error(/* user not found */);
        }

        const updatedUser = await User.findByIdAndUpdate(
            requester,
            {
                $pull: { following: id }
            },
            { new: true }
        ).lean();

        return {
            user: updatedUser
        };
    } catch (error) {
        return {
            user: null
        };
    }
}

module.exports = unfollowUser;
