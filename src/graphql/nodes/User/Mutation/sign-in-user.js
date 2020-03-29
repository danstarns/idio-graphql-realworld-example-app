const { comparePassword, createJWT } = require("../../../../util/index.js");
const { User } = require("../../../../models/index.js");

async function signInUser(root, args) {
    const {
        input: { email, password }
    } = args;

    const SignInUserPayload = { errors: [], token: null, viewer: null };

    try {
        const user = await User.findOne({ email }).lean();

        if (!user) {
            throw new Error("email or password is invalid");
        }

        const { password: hash } = user;

        const valid = await comparePassword(password, hash);

        if (!valid) {
            throw new Error("email or password is invalid");
        }

        const token = await createJWT(user);

        const { _id, ...restOfUser } = user;

        return {
            ...SignInUserPayload,
            token,
            viewer: {
                user: {
                    id: user._id,
                    ...restOfUser
                }
            }
        };
    } catch ({ message, stack }) {
        return {
            ...SignInUserPayload,
            errors: [{ message, path: stack }]
        };
    }
}

module.exports = signInUser;
