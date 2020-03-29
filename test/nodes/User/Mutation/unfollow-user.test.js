const { MongoMemoryServer } = require("mongodb-memory-server-global");
const { gql } = require("apollo-server-express");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { User } = require("../../../../src/models/index.js");
const graphql = require("../../../graphql.js");

describe("User.Mutation.unfollowUser", () => {
    let mongo;

    before(async () => {
        mongo = new MongoMemoryServer();

        const mongoUri = await mongo.getUri();

        mongoose.set("useCreateIndex", true);
        mongoose.set("useFindAndModify", false);

        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    });

    after(async () => {
        await mongoose.disconnect();

        await mongo.stop();
    });

    afterEach(async () => {
        const collections = await mongoose.connection.db.collections();

        await Promise.all(collections.map(collection => collection.drop()));
    });

    it("should unfollow a user", async () => {
        const user = await User.create({
            image: "http://cat.com",
            username: "Tester",
            bio: "Testing always...",
            email: "test@test.com",
            password: "secretHASH",
            following: [],
            favorites: {
                articles: []
            }
        });

        const followee = await User.create({
            image: "http://cat.com",
            username: "Tester2",
            bio: "Testing always...",
            email: "test2@test2.com",
            password: "secretHASH",
            following: [user._id],
            favorites: {
                articles: []
            }
        });

        const UnfollowUserInput = {
            id: followee._id.toString()
        };

        const { mutate } = graphql({ user: user._id.toString() });

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($UnfollowUserInput: UnfollowUserInput!) {
                    unfollowUser(input: $UnfollowUserInput) {
                        user {
                            id
                            username
                            email
                        }
                    }
                }
            `,
            variables: {
                UnfollowUserInput
            }
        });

        expect(errors).to.equal(undefined);

        const { username, email } = data.unfollowUser.user;

        expect(username).to.equal(followee.username);
        expect(email).to.equal(followee.email);

        const found = await User.findById(user._id);

        expect(
            found.following
                .map(x => x.toString())
                .includes(followee._id.toString())
        ).to.equal(false);
    });
});
