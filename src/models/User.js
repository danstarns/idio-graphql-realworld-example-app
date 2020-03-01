const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            index: true
        },
        email: {
            type: String,
            index: true
        },
        password_digest: { type: String, required: true },
        bio: String,
        image: String,
        follows_count: Number
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", User);
