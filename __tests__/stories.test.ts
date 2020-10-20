// supertest to test is used for HTTP requests/responses
const request = require("supertest");
// we need our app for the correct routes
const testApp = require("../app");
// let the system know that we are using the test mode
process.env.NODE_ENV = "test";

// Testing the app
describe("Sense checking", () => {
  // this first test failing shows that there is a problem with the test framework that we need to fix
  test("Testing frame work works", () => {
    expect(3 + 1).toBe(4);
  });

  // this test will make sure the app is running and it accepts coonections
  test("The REST API works", async () => {
    return await request(testApp)
      .get("/")
      .then((response) => {
        // Check that the api is running
        expect(response.body).toEqual("Hello World");
        expect(response.statusCode).toBe(200);
      });
  });
});

// Declaring these values early on in the tests because they will be used regularly and
// if we want to chage any of these values, we do it in one place
const firstStory = {
    name: "First story",
    id: 1,
    userID: 1,
  },
  secondStory = {
    name: "Second story",
    id: 2,
    userID: 1,
  },
  firstSnippet = {
    snippet: "First snippet mother Branch",
    id: 1,
    parentID: null,
    storyID: 1,
    direction: null,
  },
  secondSnippet = {
    snippet: "Second snippet, level 1",
    id: 2,
    parentID: 1,
    storyID: 1,
    direction: "top",
  },
  thirdSnippet = {
    snippet: "Third snippet level 2",
    id: 3,
    parentID: 2,
    storyID: 1,
    direction: "right",
  },
  fourthSnippet = {
    snippet: "FourtH snippet level 2",
    id: 4,
    parentID: 2,
    storyID: 1,
    direction: "left",
  };

// Testing snippetts
describe("Create and get a snippet", () => {
  describe("POST /snippet ", () => {
    // TODO: tests for attempting to insert invalid user

    it("It should respond with the newly added snipet", () => {});

    //running the same test for the second user to make sure we can handle multiple users
    test("It should respond with the newly added user id after adding the second snippet in the same level", () => {});

    it("It should respond with the newly added snipet in the scond level", () => {});

    //running the same test for the second user to make sure we can handle multiple users
    test("It should respond with the newly added user id after adding the second snippet in the second level", () => {});
  });

  describe("GET /spnippets/:parentID ", () => {
    test("It should respond with the correct snippets after passing in the first parent id ", () => {});

    test("It should respond with the correct snippets after passing in the second parent id", () => {});
  });
});

// Testing notes
describe("Create, get, update, archive and delete snippets", () => {
  describe("POST/ note", () => {
    //breath and depth
    test("It should respond with the newly added snippet id ", () => {});
    test("It should respond with the newly added snippet id, after adding the second snippet in the second level", () => {});
    test("It should respond with the newly added snippet id, after adding the third snippet in the fisrt level", () => {});
    test("It should error, when adding a snippet with missing info", () => {});
  });

  describe("Get/ snippet by parent Id", () => {
    test("It should respond with the snippets under the given parent id ", () => {});
    test("It should respond with the second snippets after giving 1 as the parent id ", () => {});
    test("It should respond with the third and forth snippets after giving 2 as the parent id ", () => {});
    test("It should error, when requesting a note for an invalid parent id", () => {});
  });

  describe("Get/ parent snippet by noteID", () => {
    test("It should respond with the mother snippet  with Id 1 when given 1 the story ID", () => {});
    describe("Get/ parent snippet by noteID", () => {
      test("It should respond with the mother snippet  with Id 1 when given 1 the story ID", () => {});
      // TEST THIS FOR MULTIPLE STORIES
    });
  });

  describe("PUT/ Snippet", () => {
    describe("Update snippet content  ", () => {
      test("It should prove that the snippet is updated (first)", () => {});
      test("It should prove that the snippet is updated (second)", () => {});
      test("It should error, when updating another users story", () => {
        // TODO: PREPARE DATA FOR THIS TEST
      });
    });
  });
});
