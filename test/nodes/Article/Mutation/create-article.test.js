const { MongoMemoryServer } = require("mongodb-memory-server-global");
const { gql } = require("apollo-server-express");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { User } = require("../../../../src/models/index.js");
const graphql = require("../../../graphql.js");

describe("Article.Mutation.createArticle", () => {
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

    it("should throw unauthorized if no user in context", async () => {
        const { mutate } = graphql();

        const CreateArticleInput = {
            title: "test",
            description: "description",
            body: "som random article",
            tagList: ["beer"]
        };

        const { errors } = await mutate({
            mutation: gql`
                mutation($CreateArticleInput: CreateArticleInput!) {
                    createArticle(input: $CreateArticleInput) {
                        article {
                            id
                            title
                            description
                            body
                            tagList
                        }
                        errors {
                            message
                            path
                        }
                    }
                }
            `,
            variables: {
                CreateArticleInput
            }
        });

        expect(errors)
            .to.be.a("array")
            .lengthOf(1);

        const [{ message }] = errors;

        expect(message).to.equal("unauthorized");
    });

    it("should create a article", async () => {
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

        const { mutate } = graphql({ user: user._id.toString() });

        const CreateArticleInput = {
            title: "test",
            description: "description",
            body: "som random article",
            tagList: ["beer"]
        };

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($CreateArticleInput: CreateArticleInput!) {
                    createArticle(input: $CreateArticleInput) {
                        article {
                            id
                            title
                            description
                            body
                            tagList
                        }
                        errors {
                            message
                            path
                        }
                    }
                }
            `,
            variables: {
                CreateArticleInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.createArticle).to.be.a("object");

        expect(data.createArticle.errors)
            .to.be.a("array")
            .lengthOf(0);

        const { article } = data.createArticle;

        expect(article).to.have.property("id");

        expect(article)
            .to.have.property("title")
            .to.equal(CreateArticleInput.title);

        expect(article)
            .to.have.property("description")
            .to.equal(CreateArticleInput.description);

        expect(article)
            .to.have.property("body")
            .to.equal(CreateArticleInput.body);

        expect(article)
            .to.have.property("tagList")
            .to.be.a("array")
            .lengthOf(1);

        expect(article.tagList[0]).to.equal("beer");
    });
});
