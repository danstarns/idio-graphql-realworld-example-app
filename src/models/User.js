const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const User = new mongoose.Schema(
    {
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
        password: { type: String, required: true },
        following: { type: [mongoose.Schema.Types.ObjectId], ref: "User" },
        favorites: {
            articles: { type: [mongoose.Schema.Types.ObjectId], ref: "Article" }
        }
    },
    { timestamps: true }
);

User.plugin(mongoosePaginate);

module.exports = mongoose.model("User", User);
