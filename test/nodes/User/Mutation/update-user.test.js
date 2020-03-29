const { MongoMemoryServer } = require("mongodb-memory-server-global");
const { gql } = require("apollo-server-express");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { User } = require("../../../../src/models/index.js");
const graphql = require("../../../graphql.js");

describe("User.Mutation.updateUser", () => {
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

    it("should throw user not found", async () => {
        const UpdateUserInput = {
            email: "netemail@test.com",
            username: "Username"
        };

        const { mutate } = graphql();

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($UpdateUserInput: UpdateUserInput!) {
                    updateUser(input: $UpdateUserInput) {
                        errors {
                            message
                        }
                    }
                }
            `,
            variables: {
                UpdateUserInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.updateUser.errors[0].message).to.equal("User not found");
    });

    it("should update a user", async () => {
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

        const UpdateUserInput = {
            email: "netemail@test.com",
            username: user.username
        };

        const { mutate } = graphql({ user: user._id.toString() });

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($UpdateUserInput: UpdateUserInput!) {
                    updateUser(input: $UpdateUserInput) {
                        user {
                            id
                            email
                        }
                    }
                }
            `,
            variables: {
                UpdateUserInput
            }
        });

        expect(errors).to.equal(undefined);

        const { id, email } = data.updateUser.user;

        expect(id).to.equal(user._id.toString());
        expect(email).to.equal(UpdateUserInput.email);
    });
});
