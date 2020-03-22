const { gql } = require("apollo-server-express");

async function articles(root, { input }, { user, injections: { execute } }) {
    const { first, after } = input;

    const { data, errors } = await execute(
        gql`
        {
            articles(
                first: ${first}
                after: "${after}"
                forUser: true
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
        { context: { user } }
    );

    if (errors && errors.length) {
        throw new Error(errors[0].message);
    }

    return data.articles;
}

module.exports = articles;
