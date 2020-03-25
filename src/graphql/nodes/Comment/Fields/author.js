const { User } = require("../../../../models/index.js");

async function author({ author: authorID }) {
    return User.findById(authorID);
}

module.exports = author;
