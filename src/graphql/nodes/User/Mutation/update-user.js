const { User } = require("../../../../models/index.js");
const { hashPassword } = require("../../../../util/index.js");

async function updateUser(root, { input }) {
    const UpdateUserPayload = { errors: [], user: null };

    try {
        const existing = await User.findOne({
            username: input.username
        }).lean();

        if (!existing) {
            throw new Error(`User not found`);
        }

        if (input.password) {
            input.password = await hashPassword(input.password);
        }

        const updated = await User.findByIdAndUpdate(
            existing._id,
            {
                $set: input
            },
            { new: true }
        );

        return {
            ...UpdateUserPayload,
            user: updated
        };
    } catch ({ message, stack }) {
        return {
            ...UpdateUserPayload,
            errors: [{ message, stack }]
        };
    }
}

module.exports = updateUser;
