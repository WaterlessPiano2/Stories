//there is a known bug where I cant declare variables with the same name in different files, thats why these are named weirdly
const r = require("supertest");
const a = require("../app");

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
          expect(r.body.id).toBe(firstSnippet.id);
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
          expect(r.body.id).toBe(secondSnippet.id);
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
          expect(r.body.id).toBe(thirdSnippet.id);
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
          expect(r.body.id).toBe(fourthSnippet.id);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    // test("It should error, when adding a snippet with missing info", async () => {
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
    //test("It should error, when requesting a snippet for an invalid parent id", async () => {});
  });

  describe("Get/ Main parent snippet by noteID", () => {
    test("It should respond with the correct main parent snippet when given a snippet ID", async () => {
      return await r(a)
        .get(`/backToStart/${fourthSnippet.noteID}`)
        .then((r) => {
          expect(r.body.children[0].id).toBe(secondSnippet.id);
          expect(r.body.parent.id).toBe(firstSnippet.id);
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
  });
  // TEST THIS FOR MULTIPLE STORIES
});

describe("PUT/ Snippet", () => {
  describe("Update snippet content  ", () => {
    test("It should respond with `success` after snippett is updated", async () => {
      return await r(a)
        .put(`/Snippet/`)
        .send({ snippet: "updated second snippet", id: 2 })
        .then((r) => {
          expect(r.body.message).toBe("success");
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    test("It should prove that the snippet is updated (first)", async () => {
      return await r(a)
        .get(`/snippets/${firstSnippet.id}`)
        .then((r) => {
          expect(r.body).toHaveLength(1);
          expect(r.body[0].id).toBe(secondSnippet.id);
          expect(r.body[0].snippet).toBe("updated second snippet");
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
    test("It should prove that the snippet is updated (second) staright after editing it", async () => {
      await r(a)
        .put(`/Snippet/`)
        .send({ snippet: "updated third snippet", id: 3 })
        .then((r) => {
          expect(r.body.message).toBe("success");
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });

      await r(a)
        .get(`/snippets/${secondSnippet.id}`)
        .then((r) => {
          expect(r.body).toHaveLength(2);
          expect(r.body[0].id).toBe(thirdSnippet.id);
          expect(r.body[0].snippet).toBe("updated third snippet");
          expect(r.statusCode).toBe(200);
        })
        .catch((e) => {
          throw new Error(e);
        });
    });
  });
});
