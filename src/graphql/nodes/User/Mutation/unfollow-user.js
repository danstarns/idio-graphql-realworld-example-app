const { User } = require("../../../../models/index.js");

async function unfollowUser(
    root,
    { user: userToUnfollow },
    { user: requester }
) {
    try {
        const user = await User.findById(userToUnfollow);

        if (!user) {
            throw new Error(/* user not found */);
        }

        const updatedUser = await User.findByIdAndUpdate(
            requester,
            {
                $pull: { following: userToUnfollow }
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
