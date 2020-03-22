const { User } = require("../../../../models/index.js");

function user(root, { username }) {
    return User.findOne({ username }).lean();
}

module.exports = user;
