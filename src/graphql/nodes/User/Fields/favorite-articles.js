const { gql } = require("apollo-server-express");
const { User } = require("../../../../models/index.js");

async function favoriteArticles(
    root,
    { first, after },
    { injections: { execute } }
) {
    const user = await User.findById(root.id);

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
                        author {
                            id
                            username
                            image
                        }
                        body
                        description
                        favoritesCount
                        slug
                        tagList
                        title
                        createdAt
                        viewerHasFavorited                 
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
            context: { user: user.id }
        }
    );

    if (errors && errors.length) {
        throw new Error(errors[0].message);
    }

    return data.articles;
}

module.exports = favoriteArticles;
