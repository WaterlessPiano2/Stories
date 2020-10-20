// // supertest to test is used for HTTP requests/responses
// const request = require("supertest");
// // we need our app for the correct routes
// const testApp = require("../app");
// // let the system know that we are using the test mode
// process.env.NODE_ENV = "test";

// Testing the app
describe("Sense checking", () => {
  // this first test failing shows that there is a problem with the test framework that we need to fix
  test("Testing frame work works", () => {
    expect(3 + 1).toBe(4);
  });

  // this test will make sure the app is running and it accepts coonections
  test("The REST API works",  () => {
    // const response = await request(testApp).get("/");
    // // Check that the api is running
    // expect(response.body).toEqual("Hello World");
    // expect(response.statusCode).toBe(200);
  });
});

// // Declaring these values early on in the tests because they will be used regularly and
// // if we want to chage any of these values, we do it in one place
// const firstUser = {
//     name: "First User",
//     id: 1,
//   },
//   secondUser = {
//     name: "Second User",
//     id: 2,
//   },
//   firstNote = {
//     note: "First Note",
//     id: 1,
//     userId: 1,
//   },
//   secondNote = {
//     note: "Second Note",
//     id: 2,
//     userId: 2,
//   },
//   thirdNote = {
//     note: "third Note",
//     id: 3,
//     userId: 2,
//   };

// // Testing Users
// describe("Create and get a user in a multi user environment", () => {
//   describe("POST /user ", () => {
//     // TODO: tests for attempting to insert invalid user
//     it("It should respond with the newly added user", async () => {
//       const newUser = await request(testApp).post("/user").send({
//         name: firstUser.name,
//       });

//       // make sure the id is generated
//       expect(newUser.body.id).toBe(firstUser.id);
//       // // make sure the name is saved correctly
//       // expect(newUser.body.name).toBe(firstUser.name);
//       expect(newUser.statusCode).toBe(200);
//     });

//     //running the same test for the second user to make sure we can handle multiple users
//     test("It should respond with the newly added user id after adding the second user", async () => {
//       const newUser = await request(testApp).post("/user").send({
//         name: secondUser.name,
//       });

//       // make sure the id increments
//       expect(newUser.body.id).toBe(secondUser.id);
//       // // make sure we dont get the wrong user
//       // expect(newUser.body.name).toBe(secondUser.name);
//       expect(newUser.statusCode).toBe(200);
//     });
//   });

//   describe("GET /user/:id ", () => {
//     test("It should respond with the correct user after passing in the first user id", async () => {
//       const user = await request(testApp).get(`/user/${firstUser.id}`);

//       // make sure we get the first user id
//       expect(user.body.id).toBe(firstUser.id);
//       // make sure we get the first user name
//       expect(user.body.name).toBe(firstUser.name);
//       expect(user.statusCode).toBe(200);
//       return;
//     });

//     test("It should respond with the correct user after passing in the second user id", async () => {
//       const user = await request(testApp).get(`/user/${secondUser.id}`);

//       // make sure we get the second user id
//       expect(user.body.id).toBe(secondUser.id);
//       // make sure we get the second user name
//       expect(user.body.name).toBe(secondUser.name);
//       expect(user.statusCode).toBe(200);
//       return;
//     });
//   });
// });

// // Testing notes
// describe("Create, get, update, archive and delete notes", () => {
//   describe("POST/ note", () => {
//     test("It should respond with the newly added note id ", async () => {
//       const newNote = await request(testApp).post("/note").send({
//         note: firstNote.note,
//         // in ideal world we would make each user have sessions on the server, so we would check that to know which user is making these requests
//         // for now we will manually send user id in every api call to know which user is making this request
//         // in production this will not be a secure solution because it is easy for an attacker pretend to be another user.
//         userId: firstNote.userId,
//       });

//       // make sure the id is generated
//       expect(newNote.body.id).toBe(firstNote.id);
//       // // make sure the note is saved correctly
//       // expect(newNote.body.note).toBe(firstNote.note);
//       expect(newNote.statusCode).toBe(200);
//     });

//     test("It should respond with the newly added note id, after adding the second note", async () => {
//       const newNote = await request(testApp).post("/note").send({
//         note: secondNote.note,
//         userId: secondNote.userId,
//       });

//       // make sure the id is incremented
//       expect(newNote.body.id).toBe(secondNote.id);
//       // // make sure the note is saved correctly
//       // expect(newNote.body.note).toBe(secondNote.note);
//       expect(newNote.statusCode).toBe(200);
//     });
//     //this test is to make sure tha the same user can have multiple notes
//     test("It should respond with the newly added note id, after adding the third note", async () => {
//       const newNote = await request(testApp).post("/note").send({
//         note: thirdNote.note,
//         userId: thirdNote.userId,
//       });

//       // make sure the id is incremented
//       expect(newNote.body.id).toBe(thirdNote.id);
//       // // make sure the note is saved correctly
//       // expect(newNote.body.note).toBe(secondNote.note);
//       expect(newNote.statusCode).toBe(200);
//     });

//     test("It should error, when adding a note for an invalid user Id", async () => {
//       const newNote = await request(testApp).post("/note").send({
//         note: "Invalid Note - This should not save",
//         userId: 0,
//       });

//       expect(newNote.body.error).toBe(
//         "Can't insert a note with an ID for a user that dont exist"
//       );
//       expect(newNote.statusCode).toBe(400);
//     });

//     test("It should error, when adding a note with no user Id", async () => {
//       const newNote = await request(testApp).post("/note").send({
//         note: "Invalid Note - This should not save",
//       });

//       expect(newNote.body.error).toBe(
//         "Can't insert a note without a valid user ID"
//       );
//       expect(newNote.statusCode).toBe(400);
//     });
//     test("It should error, when adding a note with no text", async () => {
//       const newNote = await request(testApp).post("/note").send({
//         userId: firstUser.id,
//       });

//       expect(newNote.body.error).toBe("Can't insert an empty note");
//       expect(newNote.statusCode).toBe(400);
//     });
//   });

//   //These notes have been created in the previous tests
//   describe("Get/ note by Note Id", () => {
//     test("It should respond with the correct note (first)", async () => {
//       const note = await request(testApp).get(`/note/${firstNote.id}`);

//       expect(note.body.id).toBe(firstNote.id);
//       expect(note.body.note).toBe(firstNote.note);
//       expect(note.body.userId).toBe(firstNote.userId);
//       expect(note.body.isArchived).toBe(0);
//       expect(note.statusCode).toBe(200);
//       return;
//     });

//     test("It should respond with the correct note (second)", async () => {
//       const note = await request(testApp).get(`/note/${secondNote.id}`);

//       expect(note.body.id).toBe(secondNote.id);
//       expect(note.body.note).toBe(secondNote.note);
//       expect(note.body.userId).toBe(secondNote.userId);
//       expect(note.body.isArchived).toBe(0);
//       expect(note.statusCode).toBe(200);
//       return;
//     });

//     test("It should error, when requesting a note for an invalid note Id", async () => {
//       const note = await request(testApp).get(`/note/${0}`);

//       expect(note.body.error).toBe(
//         "Error getting Note by Id, No note with the given Id"
//       );
//       expect(note.statusCode).toBe(400);
//       return;
//     });
//   });
//   //Any user can see any other users note?

//   describe("Get/ notes by User", () => {
//     test("It should respond with the note created by the first user", async () => {
//       const note = await request(testApp).get(`/notes/${firstUser.id}`);

//       expect(note.body).toHaveLength(1);
//       expect(note.body[0].id).toBe(firstNote.id);
//       expect(note.statusCode).toBe(200);
//       return;
//     });

//     test("It should respond with the notes created by the seconduser", async () => {
//       const notes = await request(testApp).get(`/notes/${secondUser.id}`);

//       expect(notes.body).toHaveLength(2);
//       expect(notes.body[0].id).toBe(secondNote.id);
//       expect(notes.body[1].id).toBe(thirdNote.id);
//       expect(notes.statusCode).toBe(200);
//       return;
//     });

//     test("It should error, when requesting a note for an invalid user Id", async () => {
//       const note = await request(testApp).get(`/notes/0`);

//       expect(note.body.error).toBe(
//         "Can't get notes for the given user, the user does not exist"
//       );
//       expect(note.statusCode).toBe(400);
//       return;
//     });
//   });

//   describe("Get/ all notes", () => {
//     test("It should respond with all", async () => {
//       const notes = await request(testApp).get(`/allNotes`);

//       expect(notes.body).toHaveLength(3);
//       expect(notes.body[0].id).toBe(firstNote.id);
//       expect(notes.body[1].id).toBe(secondNote.id);
//       expect(notes.body[2].id).toBe(thirdNote.id);
//       expect(notes.statusCode).toBe(200);
//       return;
//     });
//   });

//   describe("PUT/ note", () => {
//     describe("Update note content  ", () => {
//       test("It should prove that the note is updated (first)", async () => {
//         let note = await request(testApp).put(`/note`).send({
//           id: firstNote.id,
//           userId: firstNote.userId,
//           note: "first note updated",
//         });

//         expect(note.body.message).toBe("success");
//         expect(note.statusCode).toBe(200);

//         note = await request(testApp).get(`/note/${firstNote.id}`);

//         expect(note.body.id).toBe(firstNote.id);
//         expect(note.body.note).toBe("first note updated");
//         expect(note.statusCode).toBe(200);
//       });

//       test("It should prove that the note is updated (second)", async () => {
//         let note = await request(testApp).put(`/note`).send({
//           id: secondNote.id,
//           userId: secondNote.userId,
//           note: "Second note updated",
//         });

//         expect(note.body.message).toBe("success");
//         expect(note.statusCode).toBe(200);

//         note = await request(testApp).get(`/note/${secondNote.id}`);

//         expect(note.body.id).toBe(secondNote.id);
//         expect(note.body.note).toBe("Second note updated");
//         expect(note.statusCode).toBe(200);
//       });

//       test("It should error, when updating a note with no text", async () => {
//         let note = await request(testApp)
//           .put(`/note`)
//           .send({ id: secondNote.id, userId: secondNote.userId, note: "" });

//         expect(note.body.error).toBe("cant update a note with empty contents");
//         expect(note.statusCode).toBe(400);
//       });
//       // what should be the permssions to edit?
//     });

//     describe("PUT/ Archive note", () => {
//       test("It should respond with the newly archived note (third note)", async () => {
//         let note = await request(testApp)
//           .put(`/archiveNoteToggle`)
//           .send({ id: secondNote.id, userId: secondNote.userId });

//         expect(note.body.message).toBe("success");
//         expect(note.statusCode).toBe(200);

//         note = await request(testApp).get(`/note/${secondNote.id}`);

//         expect(note.body.id).toBe(secondNote.id);
//         expect(note.body.isArchived).toBe(1);
//         expect(note.statusCode).toBe(200);
//       });

//       test("It should respond with the newly archived note, after archiving the second note", async () => {
//         let note = await request(testApp)
//           .put(`/archiveNoteToggle`)
//           .send({ id: thirdNote.id, userId: thirdNote.userId });

//         expect(note.body.message).toBe("success");
//         expect(note.statusCode).toBe(200);

//         note = await request(testApp).get(`/note/${thirdNote.id}`);

//         expect(note.body.id).toBe(thirdNote.id);
//         expect(note.body.isArchived).toBe(1);
//         expect(note.statusCode).toBe(200);
//       });

//       test("It should respond with the newly *UN*archived note, after *UN*archiving the second note", async () => {
//         let note = await request(testApp)
//           .put(`/archiveNoteToggle`)
//           .send({ id: secondNote.id, userId: secondNote.userId });

//         expect(note.body.message).toBe("success");
//         expect(note.statusCode).toBe(200);

//         note = await request(testApp).get(`/note/${secondNote.id}`);

//         expect(note.body.id).toBe(secondNote.id);
//         expect(note.body.isArchived).toBe(0);
//         expect(note.statusCode).toBe(200);
//       });

//       test("It should error, when archiving a note with an invalid note Id", async () => {
//         let note = await request(testApp)
//           .put(`/archiveNoteToggle`)
//           .send({ id: 0, userId: secondNote.userId });

//         expect(note.body.error).toBe(
//           "Error getting Note by Id, No note with the given Id"
//         );
//         expect(note.statusCode).toBe(400);
//       });
//     });
//   });

//   describe("Get/ archived notes by User", () => {
//     test("It should respond with the notes archived", async () => {
//       const notes = await request(testApp).get(`/allNotesByArchiedState/1`);

//       expect(notes.body).toHaveLength(1);
//       expect(notes.body[0].id).toBe(thirdNote.id);
//       expect(notes.statusCode).toBe(200);
//       return;
//     });

//     test("It should respond with the notes *UN*archived", async () => {
//       const notes = await request(testApp).get(`/allNotesByArchiedState/0`);

//       expect(notes.body).toHaveLength(2);
//       expect(notes.body[0].id).toBe(firstNote.id);
//       expect(notes.body[1].id).toBe(secondNote.id);
//       expect(notes.statusCode).toBe(200);
//       return;
//     });
//   });

//   describe("DELETE/ note", () => {
//     test("It should respond with the confirmation ", async () => {
//       let note = await request(testApp)
//         .delete(`/note`)
//         .send({ id: secondNote.id, userId: secondNote.userId });

//       expect(note.body.message).toBe("success");
//       expect(note.statusCode).toBe(200);
//     });

//     test("It should respond with the list of notes without the previously deleted note ", async () => {
//       const notes = await request(testApp).get(`/allNotes`);

//       expect(notes.body).toHaveLength(2);
//       expect(notes.body[0].id).toBe(firstNote.id);
//       expect(notes.body[1].id).toBe(thirdNote.id);
//       expect(notes.statusCode).toBe(200);
//     });
//   });
// });
