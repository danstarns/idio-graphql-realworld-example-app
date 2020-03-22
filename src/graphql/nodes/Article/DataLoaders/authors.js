const DataLoader = require("dataloader");
const { User } = require("../../../../models/index.js");

const authorsLoader = new DataLoader(async userIds => {
    const users = await User.find({
        _id: { $in: userIds.map(String) }
    }).lean();

    return userIds.map(_id => users.find(x => String(x._id) === String(_id)));
});

module.exports = authorsLoader;
