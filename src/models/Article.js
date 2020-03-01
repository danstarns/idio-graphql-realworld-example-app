const mongoose = require("mongoose");

const Article = new mongoose.Schema(
    {
        slug: String,
        title: String,
        description: String,
        body: String,
        favoritesCount: { type: Number, default: 0 },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        tagList: [String],
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", Article);
