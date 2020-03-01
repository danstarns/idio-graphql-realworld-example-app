# IdioGraphQL RealWorld Example App

> This is a work in progress

> ### idio-graphql codebase containing real world examples (CRUD, auth, advanced patterns, etc)


# Docs
https://danstarns.github.io/idio-graphql/


# About

This codebase was created to demonstrate a Node.js server built with **idio-graphql** including CRUD operations, authentication, routing, pagination, and more. 

There is a React frontend that works with this server [here](https://github.com/dostu/react-apollo-realworld-example-app)

# How it works

TBD

# Getting started

> Node >= v12.0.0

1. `npm install`
2. Get or start a MongoDB server `MONGODB_URI`
3. **Configure your environment**: Place a `./.env` file in the root of the project you can use the example provided:

## .env.example

```
PORT=3000
MONGODB_URI=mongodb://localhost/test
DEBUG=@Conduit:*
SECRET=supersecret
NODE_ENV=develop
```

4. `npm run start`