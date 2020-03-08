const { User } = require("../../../../models/User.js");

async function createUser(root, args) {
    const {
        input: { username, email, password }
    } = args;

    const CreateUserPayload = { errors: [], user: null };

    if (await User.findOne({ username })) {
        return {
            ...CreateUserPayload,
            errors: [
                {
                    message: "Email has already been taken",
                    path: new Error().stack
                }
            ]
        };
    }

    return {
        ...CreateUserPayload,
        user: await User.create({ username, email, password })
    };
}

module.exports = createUser;
