const DataLoader = require("dataloader");
const { User } = require("../../../../models/index.js");

const usersLoader = new DataLoader(async userIds => {
    userIds = userIds.map(id => {
        if (id.toString) {
            return id.toString();
        }

        return id;
    });

    const users = await User.find({
        _id: { $in: userIds }
    });

    return userIds.map(id => users.find(x => x.id.toString() === id));
});

module.exports = usersLoader;
