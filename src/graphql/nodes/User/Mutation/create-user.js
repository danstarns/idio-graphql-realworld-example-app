const { User } = require("../../../../models/User.js");
const { hashPassword } = require("../../../../util/index.js");

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

    const hash = await hashPassword(password);

    return {
        ...CreateUserPayload,
        user: await User.create({ username, email, password: hash })
    };
}

module.exports = createUser;
