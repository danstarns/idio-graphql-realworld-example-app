const mongoose = require("mongoose");

const User = new mongoose.Schema(
    {
        // _id => id

        image: String,
        username: {
            type: String,
            required: true,
            index: true
        },
        bio: String,
        email: {
            type: String,
            required: true,
            index: true
        },
        password: { type: String, required: true }

        // followedByViewer ??
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", User);
