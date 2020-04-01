const { gql } = require("apollo-server-express");

async function favoriteArticles(
    root,
    { first, after },
    { injections: { execute } }
) {
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
            variables: { ids: root.favorites.articles.map(x => x.toString()) },
            context: { user: root.id }
        }
    );

    if (errors && errors.length) {
        throw new Error(errors[0].message);
    }

    return data.articles;
}

module.exports = favoriteArticles;
