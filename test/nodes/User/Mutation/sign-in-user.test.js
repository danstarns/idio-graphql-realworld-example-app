const { MongoMemoryServer } = require("mongodb-memory-server-global");
const { gql } = require("apollo-server-express");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { User } = require("../../../../src/models/index.js");
const graphql = require("../../../graphql.js");
const { hashPassword, decodeJWT } = require("../../../../src/util/index.js");

describe("User.Mutation.signInUser", () => {
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

    it("should throw unauthorized when no user found", async () => {
        const { mutate } = graphql();

        const SignInUserInput = {
            email: "test@test.com",
            password: "password"
        };

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($SignInUserInput: SignInUserInput!) {
                    signInUser(input: $SignInUserInput) {
                        errors {
                            message
                            path
                        }
                    }
                }
            `,
            variables: {
                SignInUserInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.signInUser.errors)
            .to.be.a("array")
            .lengthOf(1);

        expect(data.signInUser.errors[0].message).to.equal("unauthorized");
    });

    it("should throw unauthorized with invalid password", async () => {
        const { mutate } = graphql();

        const user = await User.create({
            image: "http://cat.com",
            username: "Tester",
            bio: "Testing always...",
            email: "test@test.com",
            password: await hashPassword("password"),
            following: [],
            favorites: {
                articles: []
            }
        });

        const SignInUserInput = {
            email: user.email,
            password: "INVALID"
        };

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($SignInUserInput: SignInUserInput!) {
                    signInUser(input: $SignInUserInput) {
                        errors {
                            message
                            path
                        }
                    }
                }
            `,
            variables: {
                SignInUserInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.signInUser.errors)
            .to.be.a("array")
            .lengthOf(1);

        expect(data.signInUser.errors[0].message).to.equal("unauthorized");
    });

    it("should sign in a user", async () => {
        const user = await User.create({
            image: "http://cat.com",
            username: "Tester",
            bio: "Testing always...",
            email: "test@test.com",
            password: await hashPassword("password"),
            following: [],
            favorites: {
                articles: []
            }
        });

        const SignInUserInput = {
            email: user.email,
            password: "password"
        };

        const { mutate } = graphql({ user: user._id.toString() });

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($SignInUserInput: SignInUserInput!) {
                    signInUser(input: $SignInUserInput) {
                        token
                        viewer {
                            user {
                                id
                                username
                                email
                            }
                        }
                    }
                }
            `,
            variables: {
                SignInUserInput
            }
        });

        expect(errors).to.equal(undefined);

        const { id, username, email } = data.signInUser.viewer.user;

        expect(id).to.equal(user._id.toString());
        expect(username).to.equal(user.username);
        expect(email).to.equal(user.email);

        const { sub } = await decodeJWT(data.signInUser.token);

        expect(sub).to.equal(user._id.toString());
    });
});
