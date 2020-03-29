# IdioGraphQL RealWorld Example App
[![CircleCI](https://circleci.com/gh/danstarns/idio-graphql/tree/master.svg?style=svg)](https://circleci.com/gh/danstarns/idio-graphql-realworld-example-app/tree/master.svg?style=svg)
[![CircleCI](https://img.shields.io/github/license/danstarns/idio-graphql)](https://github.com/danstarns/idio-graphql-realworld-example-app/blob/master/LICENSE)

> ### idio-graphql codebase containing real world examples (CRUD, auth, advanced patterns, integration test etc)


# Docs
https://danstarns.github.io/idio-graphql/


# About

This codebase was created to demonstrate a Node.js server built with [**idio-graphql**](https://danstarns.github.io/idio-graphql/) including CRUD operations, authentication, routing, pagination, and more. 

There is a React frontend that works with this server [here](https://github.com/dostu/react-apollo-realworld-example-app)

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