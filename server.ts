// Have to have this file split from the app.js so we can run the tests easier
const server = require("./app.ts");

server.listen(3000, () => console.log("server starting on port 3000!"));
