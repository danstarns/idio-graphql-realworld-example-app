const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Article = new mongoose.Schema(
    {
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        body: { type: String, required: true },
        description: { type: String, required: true },
        tagList: [String],
        title: { type: String, required: true }
    },
    { timestamps: true }
);

Article.plugin(mongoosePaginate);

module.exports = mongoose.model("Article", Article);
