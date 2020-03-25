const { gql } = require("apollo-server-express");
const { User } = require("../../../../models/index.js");

async function favoriteArticles(
    root,
    { first, after },
    { user: userId, injections: { execute } }
) {
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
                   node {
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
