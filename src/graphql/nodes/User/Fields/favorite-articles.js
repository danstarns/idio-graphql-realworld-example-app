const { gql } = require("apollo-server-express");
const { User } = require("../../../../models/index.js");

async function favoriteArticles(
    root,
    { first, after },
    { injections: { execute } }
) {
    /** @todo inter-schema */
    const user = await User.findById(root._id);

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
        {
            variables: { ids: user.favorites.articles.map(x => x.toString()) },
            context: { user: user._id.toString() }
        }
    );

    if (errors && errors.length) {
        throw new Error(errors[0].message);
    }

    return data.articles;
}

module.exports = favoriteArticles;
