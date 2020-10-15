const knex = require("knex")(
  require("./knexfile.ts")[
    process.env.NODE_ENV === "test" ? "test" : "development"
  ]
);

class DataBase {
  static async insertUser(name) {
    if (!name) {
      throw new Error("Can't insert user with missing name");
    }

    if (name.length > 50) {
      throw new Error("Can't insert user with name longer than 50 characters");
    }
    let response = {};
    try {
      await knex("users")
        .insert({
          name: name,
        })
        .then((id) => {
          if (id.length && !isNaN(id[0]) && id[0] > 0) {
            response = { id: id[0] };
          } else {
            throw new Error(id.toString());
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async getUserById(id) {
    if (!id) {
      throw new Error("Can't find a user by Id, with missing Id");
    }

    let response = {};
    try {
      await knex("users")
        .where("id", id)
        .then((user) => {
          response = user;
          if (user.length && typeof user[0] === "object") {
            response = user[0];
          } else {
            throw new Error(user.toString());
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async insertNote(note, userId) {
    if (!note && note !== 0) {
      throw new Error("Can't insert an empty note");
    }
    if (!userId && userId !== 0) {
      throw new Error("Can't insert a note without a valid user ID");
    }
    await knex("users")
      .where("id", userId)
      .then((user) => {
        if (!user.length && typeof user[0] !== "object") {
          throw new Error(
            "Can't insert a note with an ID for a user that dont exist"
          );
        }
      });

    let response = {};
    try {
      await knex("notes")
        .insert({
          note: note,
          userId: userId,
        })
        .then((id) => {
          if (id.length && !isNaN(id[0]) && id[0] > 0) {
            response = { id: id[0] };
          } else {
            throw new Error(id.toString());
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async getNoteById(id) {
    if (!id) {
      throw new Error("Can't find a note by Id, with missing Id");
    }

    let response = {};
    try {
      await knex("notes")
        .where("id", id)
        .then((note) => {
          response = note;
          if (note.length && typeof note[0] === "object") {
            response = note[0];
          } else {
            throw new Error(
              "Error getting Note by Id, No note with the given Id"
            );
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async getNotesByUserId(userId) {
    if (!userId) {
      throw new Error("Can't get a note by user Id, with missing user Id");
    }

    await knex("users")
      .where("id", userId)
      .then((user) => {
        if (!user.length && typeof user[0] !== "object") {
          throw new Error(
            "Can't get notes for the given user, the user does not exist"
          );
        }
      });

    let response = {};
    try {
      await knex("notes")
        .where("userId", userId)
        .then((note) => {
          response = note;
          if (note.length && typeof note[0] === "object") {
            response = note;
          } else {
            throw new Error(
              "Error getting Note by Id, No note with the given Id"
            );
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async getAllNotes() {
    let response = {};
    try {
      await knex
        .select()
        .from("notes")
        .then((note) => {
          response = note;
          if (note.length && typeof note[0] === "object") {
            response = note;
          } else {
            throw new Error("Error getting All Notes");
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async getAllNotesByArchiedState(archived) {
    let response = {};
    try {
      await knex
        .select()
        .from("notes")
        .where("isArchived", archived)
        .then((note) => {
          response = note;
          if (note.length && typeof note[0] === "object") {
            response = note;
          } else {
            throw new Error("Error getting  Notes");
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async archiveNoteToggle(noteId, userId) {
    if (!noteId && noteId !== 0) {
      throw new Error("Can't toggle notes archive state without note Id ");
    }
    if (!userId && userId !== 0) {
      throw new Error(
        "Can't toggle notes archive state without a valid user ID"
      );
    }

    await knex("users")
      .where("id", userId)
      .then((user) => {
        if (!user.length && typeof user[0] !== "object") {
          throw new Error(
            "Can't toggle notes archive state with an ID for a user that dont exist"
          );
        }
      });

    let note;
    try {
      await knex("notes")
        .where("id", noteId)
        .then((n) => {
          if (n.length && typeof n[0] === "object") {
            note = n[0];
          } else {
            throw new Error(
              "Error getting Note by Id, No note with the given Id"
            );
          }
        });
    } catch (e) {
      throw e;
    }
    const isArchived = note.isArchived == 1 ? 0 : 1;
    let response = {};
    try {
      await knex("notes")
        .where({ id: noteId })
        .update({ isArchived: isArchived })
        .then((r) => {
          if (r == 1) {
            response = { message: "success" };
          } else {
            throw new Error(r.toString());
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }

  static async editNote(noteId, userId, note) {
    if (!noteId && noteId !== 0) {
      throw new Error("Can't update without note Id ");
    }
    if (!userId && userId !== 0) {
      throw new Error("Can't update without a valid user ID");
    }
    if (!note && note !== 0) {
      throw new Error("cant update a note with empty contents");
    }

    let response = {};
    try {
      await knex("notes")
        .where({ id: noteId, userId: userId })
        .update({ note: note })
        .then((r) => {
          if (r == 1) {
            response = { message: "success" };
          } else {
            throw new Error(r.toString());
          }
        });
    } catch (e) {
      throw e;
    }

    return response;
  }

  static async deleteNote(noteId, userId, note) {
    if (!noteId && noteId !== 0) {
      throw new Error("Can't delete without note Id ");
    }
    if (!userId && userId !== 0) {
      throw new Error("Can't delete without a valid user ID");
    }

    let response = {};
    try {
      await knex("notes")
        .where({ id: noteId, userId: userId })
        .del()
        .then((r) => {
          if (r == 1) {
            response = { message: "success" };
          } else {
            throw new Error(r.toString());
          }
        });
    } catch (e) {
      throw e;
    }
    return response;
  }
}
module.exports = DataBase;
