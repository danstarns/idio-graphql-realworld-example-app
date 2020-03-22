const { gql } = require("apollo-server-express");
const { User } = require("../../../../models/index.js");

async function favoriteArticles(
    root,
    { input },
    { user: userId, injections: { execute } }
) {
    const { first, after } = input;

    const user = await User.findById(userId);

    const { data, errors } = await execute(
        gql`
       query ($ids: [String]) {
            articles(
                first: ${first}
                after: "${after}"
                ids: $ids
            ) {
                edges {
                    id
                    slug
                    title
                    description
                    favoritesCount
                    createdAt
                    viewerHasFavorited
                    favoritesCount
                    author {
                      id
                      username
                      image
                    }
                }
                pageInfo {
                    endCursor
                    hasNextPage
                }
            }
        }
    `,
        { variables: { ids: user.favorites.articles } }
    );

    if (errors && errors.length) {
        throw new Error(errors[0].message);
    }

    return data.articles;
}

module.exports = favoriteArticles;
