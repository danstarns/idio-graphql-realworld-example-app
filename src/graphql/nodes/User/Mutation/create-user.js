const { User } = require("../../../../models/User.js");
const { hashPassword } = require("../../../../util/index.js");

async function createUser(root, args) {
    const CreateUserPayload = { errors: [], user: null };
    const {
        input: { username, email, password }
    } = args;

    try {
        if (await User.findOne({ username })) {
            throw new Error("Email has already been taken");
        }

        const hash = await hashPassword(password);

        return {
            ...CreateUserPayload,
            user: await User.create({ username, email, password: hash })
        };
    } catch (error) {
        return {
            ...CreateUserPayload,
            errors: error
        };
    }
}

module.exports = createUser;
