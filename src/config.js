const { PORT, MONGODB_URI, DEBUG, SECRET, NODE_ENV } = process.env;

Object.entries({ PORT, DEBUG, SECRET, NODE_ENV }).forEach(([key, value]) => {
    if (!value && value !== false) {
        throw new Error(`Missing env ${key}`);
    }
});

module.exports = {
    PORT: Number(PORT),
    MONGODB_URI,
    DEBUG,
    SECRET,
    NODE_ENV
};
