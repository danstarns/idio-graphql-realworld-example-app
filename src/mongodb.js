const mongoose = require("mongoose");
const debug = require("./debug.js")("MongoDB: ");
const { MONGODB_URI, NODE_ENV } = require("./config.js");

if (NODE_ENV === "develop") {
    mongoose.set("debug", true);
}

async function start() {
    debug(`Connecting '${MONGODB_URI}'`);

    await mongoose.connect(MONGODB_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    debug("Connected");
}

module.exports = { start };
