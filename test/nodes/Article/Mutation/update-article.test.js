const { MongoMemoryServer } = require("mongodb-memory-server-global");
const { gql } = require("apollo-server-express");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { User, Article } = require("../../../../src/models/index.js");
const graphql = require("../../../graphql.js");

describe("Article.Mutation.updateArticle", () => {
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

        const UpdateArticleInput = {
            id: new mongoose.Types.ObjectId().toString(),
            title: "article.title",
            description: "article.description",
            body: "I love beer soo much",
            tagList: ["tag"]
        };

        const { errors } = await mutate({
            mutation: gql`
                mutation($UpdateArticleInput: UpdateArticleInput!) {
                    updateArticle(input: $UpdateArticleInput) {
                        article {
                            id
                            body
                            title
                        }
                    }
                }
            `,
            variables: {
                UpdateArticleInput
            }
        });

        expect(errors)
            .to.be.a("array")
            .lengthOf(1);

        const [{ message }] = errors;

        expect(message).to.equal("unauthorized");
    });

    it("should update a article", async () => {
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

        const article = await Article.create({
            author: user._id,
            body: "I love beer!",
            description: "Me talking about beer",
            tagList: ["beer", "bongs"],
            title: "Beer"
        });

        const { mutate } = graphql({ user: user._id.toString() });

        const UpdateArticleInput = {
            id: article._id.toString(),
            title: article.title,
            description: article.description,
            body: "I love beer soo much",
            tagList: article.tagList
        };

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($UpdateArticleInput: UpdateArticleInput!) {
                    updateArticle(input: $UpdateArticleInput) {
                        article {
                            id
                            body
                            title
                        }
                    }
                }
            `,
            variables: {
                UpdateArticleInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.updateArticle).to.be.a("object");

        expect(data.updateArticle.article)
            .to.have.property("id")
            .to.equal(article._id.toString());

        expect(data.updateArticle.article)
            .to.have.property("title")
            .to.equal(article.title);

        expect(data.updateArticle.article)
            .to.have.property("body")
            .to.equal(UpdateArticleInput.body);
    });
});
