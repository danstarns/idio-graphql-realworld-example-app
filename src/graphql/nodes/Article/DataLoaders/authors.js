const DataLoader = require("dataloader");
const { User } = require("../../../../models/index.js");

const authorsLoader = new DataLoader(async inputIDs => {
    inputIDs = inputIDs.map(_id => {
        if (_id.toString) {
            return _id.toString();
        }

        return _id;
    });

    const users = await User.find({
        _id: { $in: inputIDs }
    }).lean();

    return inputIDs.map(_id => users.find(x => _id === x._id.toString()));
});

module.exports = authorsLoader;
