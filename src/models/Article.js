const mongoose = require("mongoose");

const Article = new mongoose.Schema(
    {
        // _id => id

        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: { type: String, required: true },
        description: { type: String, required: true },
        slug: { type: String, required: true },
        tagList: [String],
        title: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Article", Article);
