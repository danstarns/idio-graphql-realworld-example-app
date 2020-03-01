const mongoose = require("mongoose");

const Article = new mongoose.Schema(
    {
        // _id => id

        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: { type: String, required: true },
        comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
        description: { type: String, required: true },
        favoritesCount: { type: Number, default: 0 },
        slug: { type: String, required: true },
        tagList: [String],
        title: { type: String, required: true }

        // viewerHasFavorited: Boolean ?
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", Article);
