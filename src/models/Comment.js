const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
    {
        // _id => id

        article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: String
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
