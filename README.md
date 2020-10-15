# Notes

A REST API backend application that can be used to manage personal notes in a multi-user environment.

## Starting

### Install Node packages

`npm install`

### Initiate tables in the database

I used Knex to set up the database, adding tables and making querys to the database, because of it ease of use and becuase it is a well tested framework.

Rollback will drop tables so if you dont want to loose your data dont run this command
`knex migrate:rollback -all`

Will freshly initiate tables
`knex migrate:Latest`

### Start

`npm run start`

## Testing

### Install dependencies

I chose jest because its quick to start, simple and scaleable. I have beebn using Mocha in my tests but I have been looking for an opportunity to try Jest.
It is maintained by Facebook. and it is one of the most videly used testing frameworks.

`npm install -g jest`

### Run tests

`npm run test`

Behind the scenes this will destroy all the tables and then re create them from scratch, so the previous tests dont affect outcurrent tests.
To make specific Knex commands to the test databaes use `NODE_ENV=test` before the command. For example `NODE_ENV=test knex migrate:rollback`.

## Todos

- [x] Save a new note
- [x] Update a previously saved note
- [x] Delete a saved note
- [x] Archive a note
- [x] Unarchive a previously archived note
- [x] List saved notes that aren't archived
- [x] List notes that are archived
- [x] Multi user

## Reasons Behind Decisions

Here I will describe how I made some of the decisions and why.

### Test Driven Development (TDD)

Writing tests before implementing the feature. the tests will initially fail. As the feature gets implemented, the tests will pass one by one.
The reason I have decided to go with TDD is because

- I have never done TDD before and I wanted to take this opportunity to see if it is as good as it is hyped up to be.
- Maybe front end development manual testing is easier, but in the back end it is not.
- Without automated tests I would have either had a ton of curl comands for testing each endpoint differently, and they would have got confusing.
- I can quickly test the whole app every time I want to do a test.
