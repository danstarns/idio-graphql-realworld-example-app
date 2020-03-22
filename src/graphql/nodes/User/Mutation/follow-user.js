const { User } = require("../../../../models/index.js");

async function followUser(root, { user: userToFollow }, { user: requester }) {
    try {
        const user = await User.findById(userToFollow);

        if (!user) {
            throw new Error(/* user not found */);
        }

        const updatedUser = await User.findByIdAndUpdate(
            requester,
            {
                $addToSet: { following: userToFollow }
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

module.exports = followUser;
