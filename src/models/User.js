const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const secret = require("../config").secret;

const User = new mongoose.Schema(
    {
        username: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/^[a-zA-Z0-9]+$/, "is invalid"],
            index: true
        },
        email: {
            type: String,
            lowercase: true,
            unique: true,
            required: [true, "can't be blank"],
            match: [/\S+@\S+\.\S+/, "is invalid"],
            index: true
        },
        bio: String,
        image: String,
        favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Article" }],
        following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        hash: String,
        salt: String
    },
    { timestamps: true }
);

User.plugin(uniqueValidator, { message: "is already taken." });

User.methods.validPassword = function(password) {
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
    return this.hash === hash;
};

User.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
        .toString("hex");
};

User.methods.toProfileJSONFor = function(user) {
    return {
        username: this.username,
        bio: this.bio,
        image:
            this.image ||
            "https://static.productionready.io/images/smiley-cyrus.jpg",
        following: user ? user.isFollowing(this._id) : false
    };
};

User.methods.favorite = function(id) {
    if (this.favorites.indexOf(id) === -1) {
        this.favorites.push(id);
    }

    return this.save();
};

User.methods.unfavorite = function(id) {
    this.favorites.remove(id);
    return this.save();
};

User.methods.isFavorite = function(id) {
    return this.favorites.some(function(favoriteId) {
        return favoriteId.toString() === id.toString();
    });
};

User.methods.follow = function(id) {
    if (this.following.indexOf(id) === -1) {
        this.following.push(id);
    }

    return this.save();
};

User.methods.unfollow = function(id) {
    this.following.remove(id);
    return this.save();
};

User.methods.isFollowing = function(id) {
    return this.following.some(function(followId) {
        return followId.toString() === id.toString();
    });
};

module.exports = mongoose.model("User", User);
