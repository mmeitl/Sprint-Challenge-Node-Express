const express = require('express'); // import the express package
const PORT = 4000;
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
const actionRouter = require("./routers/action.js")
const projectRouter = require("./routers/project.js");



const server = express(); // creates the server

server.use(express.json(), morgan("tiny"), helmet(), cors());
server.use('/api/projects', projectRouter);
server.use('/api/actions', actionRouter);



// watch for connections on port 4000
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);