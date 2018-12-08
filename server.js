const express = require('express'); // import the express package

const PORT = 4000;
const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send('Hello from Express');
});

// watch for connections on port 5000
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);