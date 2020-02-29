const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const errorhandler = require("errorhandler");
const debug = require("../debug.js")("API: ");
const { NODE_ENV, SECRET } = require("../config.js");
const { PORT } = require("../config.js");

const app = express();

app.use(cors());
app.use(require("morgan")("dev"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("method-override")());

app.use(
    session({
        secret: SECRET,
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false
    })
);

if (!NODE_ENV) {
    app.use(errorhandler());
}

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

if (NODE_ENV === "develop") {
    app.use((err, req, res) => {
        console.log(err.stack);

        res.status(err.status || 500);

        res.json({
            errors: {
                message: err.message,
                error: err
            }
        });
    });
}

app.use((err, req, res) => {
    res.status(err.status || 500);
    res.json({
        errors: {
            message: err.message,
            error: {}
        }
    });
});

async function start() {
    return new Promise((resolve, reject) => {
        debug(`Starting @ 'http://localhost:${PORT}'`);

        app.listen(PORT, err => {
            if (err) {
                return reject(err);
            }

            debug("Started");

            return resolve();
        });
    });
}

module.exports = { start };
