const mongoose = require("mongoose");

const Comment = new mongoose.Schema(
    {
        body: String,
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", Comment);
