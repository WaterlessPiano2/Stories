// supertest to test is used for HTTP requests/responses
const r = require("supertest");
// we need our app for the correct routes
const a = require("../app");
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
    return await r(a)
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
    parentID: null,
    id: 1,
    noteID: 1,
    direction: null,
  },
  secondSnippet = {
    snippet: "Second snippet, level 1",
    id: 2,
    parentID: 1,
    noteID: 1,
    direction: "top",
  },
  thirdSnippet = {
    snippet: "Third snippet level 2",
    id: 3,
    parentID: 2,
    noteID: 1,
    direction: "right",
  },
  fourthSnippet = {
    snippet: "FourtH snippet level 2",
    id: 4,
    parentID: 2,
    noteID: 1,
    direction: "left",
  };

// Testing snippetts

describe("Create, get, update and delete snippets", () => {
  describe("POST/ snippet", () => {
    //breath and depth
    test("It should respond with the newly added snippet id ", async () => {
      return await r(a)
        .post("/snippet")
        .send(firstSnippet)
        .then((r) => {
          // make sure the id is generated
          expect(r.body.id).toBe(firstSnippet.id);
          // // make sure the name is saved correctly
          // expect(newUser.body.name).toBe(firstUser.name);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    test("It should respond with the newly added snippet id, after adding the second snippet in the second level", async () => {
      return await r(a)
        .post("/snippet")
        .send(secondSnippet)
        .then((r) => {
          // console.log(r.body);
          // make sure the id is generated
          expect(r.body.id).toBe(secondSnippet.id);
          // // make sure the name is saved correctly
          // expect(newUser.body.name).toBe(firstUser.name);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });

    test("It should respond with the newly added snippet id, after adding the third snippet in the fisrt level", async () => {
      return await r(a)
        .post("/snippet")
        .send(thirdSnippet)
        .then((r) => {
          // console.log(r.body);
          // make sure the id is generated
          expect(r.body.id).toBe(thirdSnippet.id);
          // // make sure the name is saved correctly
          // expect(newUser.body.name).toBe(firstUser.name);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });

    test("It should respond with the newly added snippet id, after adding the fourth snippet id in the fisrt level", async () => {
      return await r(a)
        .post("/snippet")
        .send(fourthSnippet)
        .then((r) => {
          // console.log(r.body);
          // make sure the id is generated
          expect(r.body.id).toBe(fourthSnippet.id);
          // // make sure the name is saved correctly
          // expect(newUser.body.name).toBe(firstUser.name);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    // test("It should error, when adding a snippet with missing info", async () => {
    //   return await r(a)
    //     .post("/snippet")
    //     .send({})
    //     .then((r) => {
    //       console.log(r);
    //       throw new Error(r);
    //     })
    //     .catch((e) => {
    //       console.log(e);
    //       expect(e.statusCode).toBe(400);
    //     });
    // });
  });

  describe("Get/ snippet by parent Id", () => {
    test("It should respond with the second snippets after giving 1 as the parent id ", async () => {
      return await r(a)
        .get(`/snippets/${firstSnippet.id}`)
        .then((r) => {
          expect(r.body).toHaveLength(1);
          expect(r.body[0].id).toBe(secondSnippet.id);
          // expect(newUser.body.name).toBe(firstUser.name);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    test("It should respond with the third and forth snippets after giving 2 as the parent id ", async () => {
      return await r(a)
        .get(`/snippets/${secondSnippet.id}`)
        .then((r) => {
          expect(r.body).toHaveLength(2);
          expect(r.body[0].id).toBe(thirdSnippet.id);
          expect(r.body[1].id).toBe(fourthSnippet.id);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    //test("It should error, when requesting a note for an invalid parent id", async () => {});
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
