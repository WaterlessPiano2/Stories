# A storybook

A web application which enables the user to write **"multi-path stories."**

A multi-path story is composed of sentences.

After each sentence, there are up to four possible next sentences,
and after each of those, another four possible next sentences, and so on.

## Todos

- [x] Create a new note(story) - with name and userID
- [x] Each story has a parentID, groupID, direction and snippet
- [x] Post and get story
- [x] Go back to start
- [x] Update story

### how it works

- User Posts a story
- Can only post and get stories
- then user post snippets to that story
- Can only post, update and get snippets
- get the begining or the next or the previous branch on the tree
- to see other parts of the tree

## Starting

To run the project follow the below instructions

### Install Node packages

Make sure you have node and npm installed, then run

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

## Boiler plate todos

There are few known incomplete about this code being used in this situation

- Can not have 2 varibales named the same at the top of the file, I am getting a type script error
  `Cannot redeclare block-scoped variable 'app'.ts(2451)`
- there is no user authentication

## Test Driven Development (TDD)

Writing tests before implementing the feature. the tests will initially fail. As the feature gets implemented, the tests will pass one by one.
The reason I have decided to go with TDD is because

- I have never done TDD before and I wanted to take this opportunity to see if it is as good as it is hyped up to be.
- Maybe front end development manual testing is easier, but in the back end it is not.
- Without automated tests I would have either had a ton of curl comands for testing each endpoint differently, and they would have got confusing.
- I can quickly test the whole app every time I want to do a test.

## Database model

How I decided to chose it

### Stack overflow

I think the naive option which is having p0arent id fits the requirements best

<https://stackoverflow.com/questions/3362669/what-are-the-known-ways-to-store-a-tree-structure-in-a-relational-db>

the reasons are:

**Pros:**

- easy to implement
- easy to move a big subtree to another parent
- insert is cheap
- Needed Fields directly accessible in SQL

**Cons:**

- retrieving a whole tree is recursive and therefore expensive
- finding all parents is expensive too ( SQL doesn't know recursions... )

### Postgresql

If I have time I would have also installed postgre and tested this to see which is better

<https://stackoverflow.com/questions/3362669/what-are-the-known-ways-to-store-a-tree-structure-in-a-relational-db>
