const { comparePassword, createJWT } = require("../../../../util/index.js");
const { User } = require("../../../../models/index.js");

async function signInUser(root, args) {
    const {
        input: { email, password }
    } = args;

    const SignInUserPayload = { errors: [], token: null, viewer: null };

    const found = await User.findOne({ email }).lean();

    if (!found) {
        return {
            ...SignInUserPayload,
            errors: [
                {
                    message: "email or password is invalid",
                    path: new Error().stack()
                }
            ]
        };
    }

    const { hash } = found;

    if (!(await comparePassword(password, hash))) {
        return {
            ...SignInUserPayload,
            errors: [
                {
                    message: "email or password is invalid",
                    path: new Error().stack()
                }
            ]
        };
    }

    const token = await createJWT(found);

    return {
        ...SignInUserPayload,
        token
    };
}

module.exports = signInUser;
