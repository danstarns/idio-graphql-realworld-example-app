const jwt = require("jsonwebtoken");
const { SECRET } = require("../config.js");

function createJWT(user) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            {
                data: { sub: user.id }
                // exp: Infinity
            },
            SECRET,
            { algorithm: "RS256" },
            (err, token) => {
                if (err) {
                    return reject(err);
                }

                return resolve(token);
            }
        );
    });
}

module.exports = createJWT;
