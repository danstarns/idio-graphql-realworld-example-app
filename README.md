# IdioGraphQL RealWorld Example App
[![CircleCI](https://circleci.com/gh/danstarns/idio-graphql-realworld-example-app/tree/master.svg?style=svg)](https://app.circleci.com/pipelines/github/danstarns/idio-graphql-realworld-example-app?branch=master)
[![CircleCI](https://img.shields.io/github/license/danstarns/idio-graphql)](https://github.com/danstarns/idio-graphql-realworld-example-app/blob/master/LICENSE)

> ### Node.js GraphQL example server built with modules, authentication, pagination, and more.


# Docs
https://danstarns.github.io/idio-graphql/


# About

This codebase was created to demonstrate a Node.js server built with [**idio-graphql**](https://danstarns.github.io/idio-graphql/) including modules, authentication, pagination, and more. 

> There is a React frontend that works with this server [here](https://github.com/dostu/react-apollo-realworld-example-app)


# Contributing

> All PR's are welcome

1. [Eslint](https://eslint.org/) => `./eslintrc`
2. [Git Flow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) => `PR|>master`
3. [Tests](#testing)

# Getting started

## Docker
1. `docker-compose up`

## Without Docker 

> Node >= v12.0.0

1. `npm install`
2. Get or start a MongoDB server `MONGODB_URI`
3. Configure your environment: `COPY` `./.env.example` => `./.env`, update `MONGODB_URI` and `PORT` if need
4. `npm run start`

# Environment Variables

```
PORT=3000
MONGODB_URI=mongodb://localhost/test
DEBUG=@Conduit:*
SECRET=supersecret
NODE_ENV=develop
```

# GraphQL Schema

The foundations of this schema were ported from [rails-graphql-realworld-example-app](https://github.com/dostu/rails-graphql-realworld-example-app), although changes have been made, both for simplicity & to lean on features provided by `idio-graphql` such as [Inter-Schema Execution](https://danstarns.github.io/idio-graphql/docs/inter-schema-execution).

> Graphs generated from [Graphql Voyager](https://github.com/APIs-guru/graphql-voyager) available @ http://localhost:3000/voyager

### Query
![GraphQL Voyager Mutation View](./assets/query.jpg)
### Mutation
![GraphQL Voyager Mutation View](./assets/mutation.jpg)
### SDL
```graphql
directive @Auth(input: AuthInput) on FIELD_DEFINITION

input AddCommentInput {
  articleId: ID!
  body: String!
}

type AddCommentPayload {
  comment: Comment
  errors: [UserError!]!
}

type Article {
  id: ID!
  author: User!
  body: String!
  comments: [Comment!]!
  description: String!
  favoritesCount: Int!
  slug: String!
  tagList: [String!]!
  title: String!
  viewerHasFavorited: Boolean!
  updatedAt: DateTime!
  createdAt: DateTime!
}

type ArticleConnection {
  edges: [ArticleEdge]
  pageInfo: PageInfo!
}

type ArticleEdge {
  cursor: String!
  node: Article
}

input AuthInput {
  required: Boolean!
  populate: Boolean = false
}

type Comment {
  id: ID!
  article: Article
  author: User
  body: String!
  createdAt: DateTime!
  updatedAt: DateTime!
}

input CreateArticleInput {
  title: String!
  description: String!
  body: String!
  tagList: [String!]!
}

type CreateArticlePayload {
  article: Article
  errors: [UserError!]!
}

input CreateUserInput {
  username: String!
  email: String!
  password: String!
}

type CreateUserPayload {
  errors: [UserError!]!
  user: User
}

"""
A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the
`date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO
8601 standard for representation of dates and times using the Gregorian calendar.
"""
scalar DateTime

input DeleteArticleInput {
  id: ID!
}

type DeleteArticlePayload {
  article: Article!
}

input DeleteCommentInput {
  id: ID!
}

type DeleteCommentPayload {
  comment: Comment
}

input FavoriteArticleInput {
  id: ID!
}

type FavoriteArticlePayload {
  article: Article
}

type FollowersConnection {
  totalCount: Int!
}

input FollowUserInput {
  id: ID!
}

type FollowUserPayload {
  user: User
}

type Mutation {
  createUser(input: CreateUserInput!): CreateUserPayload
  signInUser(input: SignInUserInput!): SignInUserPayload
  followUser(input: FollowUserInput!): FollowUserPayload
  unfollowUser(input: UnfollowUserInput!): UnfollowUserPayload
  updateUser(input: UpdateUserInput!): UpdateUserPayload
  createArticle(input: CreateArticleInput!): CreateArticlePayload
  deleteArticle(input: DeleteArticleInput!): DeleteArticlePayload
  updateArticle(input: UpdateArticleInput!): UpdateArticlePayload
  favoriteArticle(input: FavoriteArticleInput!): FavoriteArticlePayload
  unfavoriteArticle(input: UnfavoriteArticleInput!): UnfavoriteArticlePayload
  addComment(input: AddCommentInput!): AddCommentPayload
  deleteComment(input: DeleteCommentInput!): DeleteCommentPayload
}

type PageInfo {
  endCursor: String
  hasNextPage: Boolean
}

type Query {
  user(username: String!): User
  article(slug: String!): Article
  tags: [String!]!
  viewer: Viewer
  articles(first: Int = 10, after: String = "1", tag: String, forUser: Boolean, feed: Boolean, ids: [String]): ArticleConnection!
}

input SignInUserInput {
  email: String!
  password: String!
}

type SignInUserPayload {
  errors: [UserError!]!
  token: String
  viewer: Viewer
}

input UnfavoriteArticleInput {
  id: ID!
}

type UnfavoriteArticlePayload {
  article: Article
}

input UnfollowUserInput {
  id: ID!
}

type UnfollowUserPayload {
  user: User
}

input UpdateArticleInput {
  id: ID!
  title: String!
  description: String!
  body: String!
  tagList: [String!]!
}

type UpdateArticlePayload {
  article: Article
  errors: [UserError!]!
}

input UpdateUserInput {
  email: String!
  username: String!
  bio: String
  image: String
  password: String
}

type UpdateUserPayload {
  errors: [UserError!]!
  user: User
}

type User {
  id: ID!
  image: String
  username: String!
  bio: String
  email: String!
  followedByViewer: Boolean!
  articles(first: Int = 10, after: String = "1"): ArticleConnection!
  favoriteArticles(first: Int = 10, after: String = "1"): ArticleConnection!
  followers: FollowersConnection!
}

type UserEdge {
  cursor: String!
  node: User
}

type UserError {
  message: String!
  path: String
}

type Viewer {
  feed(first: Int, after: String): ArticleConnection!
  user: User
}
```

## Testing

---

1. [`mocha`](https://www.npmjs.com/package/mocha)
2. [`chai`](https://www.npmjs.com/package/chai)
3. [`nyc`](https://www.npmjs.com/package/nyc)
4. [`mongodb-memory-server`](https://www.npmjs.com/package/mongodb-memory-server)
5. [`apollo-server-testing`](https://www.npmjs.com/package/apollo-server-testing)

You can run this projects test suite with `$ npm run test`.