const { MongoMemoryServer } = require("mongodb-memory-server-global");
const { gql } = require("apollo-server-express");
const { expect } = require("chai");
const mongoose = require("mongoose");
const { User, Article } = require("../../../../src/models/index.js");
const graphql = require("../../../graphql.js");

describe("Article.Mutation.favoriteArticle", () => {
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

    it("should favorite a article", async () => {
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

        const FavoriteArticleInput = {
            id: article._id.toString()
        };

        const { data, errors } = await mutate({
            mutation: gql`
                mutation($FavoriteArticleInput: FavoriteArticleInput!) {
                    favoriteArticle(input: $FavoriteArticleInput) {
                        article {
                            id
                            body
                            title
                        }
                    }
                }
            `,
            variables: {
                FavoriteArticleInput
            }
        });

        expect(errors).to.equal(undefined);

        expect(data.favoriteArticle).to.be.a("object");

        expect(data.favoriteArticle.article)
            .to.have.property("id")
            .to.equal(article._id.toString());

        const updatedUser = await User.findById(user._id).lean();

        expect(
            updatedUser.favorites.articles
                .map(x => x.toString())
                .includes(article._id.toString())
        ).to.equal(true);
    });
});
