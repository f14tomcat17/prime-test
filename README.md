# prime-test

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.9.

## WebAPI

A small Node.js API is provided in this project. It will act as an intermediary between the client application and the RestAPI. Any sensitive data required by the latter such as the client id and secret is, thus, kept safe at a server side.

To compile it, do:

`npm run webapi:prepare`

So that running `node dist/webapi` afterwards starts the Node server.

## Client application

A small Angular-based client has been created, which uses the WebAPI's endpoints to consume the data.

Login has been simulated as a *previous step* by implementing a post-initializer that ultimately calls to the `/oauth/token` RestAPI endpoint so that the `MarketValuesComponent` can be instantiated right away.
