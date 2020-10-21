const db = require("./db.ts");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

const message = "Hello World";

app.get("/", (req, res) => {
  return res.json(message);
});

app.get("/user/:id", (req, res) => {
  if (!req.params) {
    throw new Error(
      "The '/GET /user:ID' end point has been called without any parameters"
    );
  }
  try {
    db.getUserById(req.params.id).then((r) => res.send(r));
  } catch (e) {
    throw e;
  }
});

app.post("/user", async (req, res) => {
  if (!req.body) {
    throw new Error(
      "The '/POST /user' end point has been called without a body"
    );
  }
  try {
    db.insertUser(req.body.name).then((r) => res.send(r));
  } catch (e) {
    throw e;
  }
});

app.post("/note", async (req, res) => {
  if (!req.body) {
    throw new Error(
      "The '/POST /note' end point has been called without a body"
    );
  }

  db.insertNote(req.body.note, req.body.userId)
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.statusCode = 400;
      res.send({ error: e.message });
    });
});

app.post("/snippet", async (req, res) => {
  if (!req.body) {
    throw new Error(
      "The '/POST /snippet' end point has been called without a body"
    );
  }

  if (req && req.body) {
    //can have validation here
    db.insertSnippet(req.body)
      .then((r) => {
        res.send(r);
      })
      .catch((e) => {
        res.statusCode = 400;
        res.send({ error: e.message });
      });
  }
});

app.get("/note/:id", async (req, res) => {
  if (!req.body) {
    throw new Error(
      "The '/GET /note' end point has been called without a body"
    );
  }

  db.getNoteById(req.params.id)
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.statusCode = 400;
      res.send({ error: e.message });
    });
});

app.get("/MainparentSnippet/:id", async (req, res) => {
  db.getMainParentSnippet(req.params.id)
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.statusCode = 400;
      res.send({ error: e.message });
    });
});

app.get("/notes/:userId", async (req, res) => {
  if (!req.body) {
    throw new Error(
      "The '/GET /note' end point has been called without a body"
    );
  }

  db.getNotesByUserId(req.params.userId)
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.statusCode = 400;
      res.send({ error: e.message });
    });
});

app.get("/snippets/:parentId", async (req, res) => {
  if (!req.body) {
    throw new Error(
      "The '/GET /note' end point has been called without a body"
    );
  }

  db.getSnippetsByParentId(req.params.parentId)
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.statusCode = 400;
      res.send({ error: e.message });
    });
});

app.get("/allNotes/", async (req, res) => {
  db.getAllNotes()
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.statusCode = 400;
      res.send({ error: e.message });
    });
});

app.put("/note", async (req, res) => {
  if (!req.body) {
    throw new Error(
      "The '/GET /note' end point has been called without a body"
    );
  }

  db.editNote(req.body.id, req.body.userId, req.body.note)
    .then((r) => {
      res.send(r);
    })
    .catch((e) => {
      res.statusCode = 400;
      res.send({ error: e.message });
    });
});

module.exports = app;
