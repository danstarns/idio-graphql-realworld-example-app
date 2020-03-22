const { User } = require("../../../../models/index.js");

async function updateUser(root, { input }, { user: requester }) {
    const UpdateUserPayload = { errors: [], user: null };

    try {
        const existing = await User.findById(requester).lean();

        if (!existing) {
            throw new Error(`User not found`);
        }

        const updated = await User.findByIdAndUpdate(
            existing._id,
            {
                ...existing,
                ...input
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
