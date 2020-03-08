const jwt = require("jsonwebtoken");
const { SECRET } = require("../config.js");

function decodeJWT(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET, (err, decoded) => {
            if (err) {
                return reject(err);
            }

            return resolve(decoded);
        });
    });
}

module.exports = decodeJWT;
