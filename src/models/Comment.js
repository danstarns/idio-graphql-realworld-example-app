const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const Comment = new mongoose.Schema(
    {
        // _id => id

        article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
        author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        body: { type: String, required: true }
    },
    { timestamps: true }
);

Comment.plugin(mongoosePaginate);

module.exports = mongoose.model("Comment", Comment);
