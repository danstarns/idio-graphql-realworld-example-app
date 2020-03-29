const { MongoMemoryServer } = require("mongodb-memory-server-global");
const { gql } = require("apollo-server-express");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { User, Article, Comment } = require("../../../../src/models/index.js");
const graphql = require("../../../graphql.js");
const { comparePassword } = require("../../../../src/util/index.js");

describe("User.Mutation.createUser", () => {
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

    it("should throw Email has already been taken", async () => {
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

        const { mutate } = graphql();

        const CreateUserInput = {
            username: user.username,
            email: user.email,
            password: "password"
        };

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($CreateUserInput: CreateUserInput!) {
                    createUser(input: $CreateUserInput) {
                        errors {
                            message
                        }
                    }
                }
            `,
            variables: {
                CreateUserInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.createUser.errors)
            .to.be.a("array")
            .lengthOf(1);

        const [{ message }] = data.createUser.errors;

        expect(message).to.equal("Email has already been taken");
    });

    it("should create a user", async () => {
        const { mutate } = graphql();

        const CreateUserInput = {
            username: "test@test.com",
            email: "test@test.com",
            password: "password"
        };

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($CreateUserInput: CreateUserInput!) {
                    createUser(input: $CreateUserInput) {
                        errors {
                            message
                        }
                        user {
                            id
                            username
                            email
                        }
                    }
                }
            `,
            variables: {
                CreateUserInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.createUser.errors)
            .to.be.a("array")
            .lengthOf(0);

        const { username, email } = data.createUser.user;

        expect(username).to.equal(CreateUserInput.username);
        expect(email).to.equal(CreateUserInput.email);

        const found = await User.findById(data.createUser.user.id);

        const compare = await comparePassword(
            CreateUserInput.password,
            found.password
        );

        expect(compare).to.equal(true);
    });
});
