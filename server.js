const express = require('express'); // import the express package
const projects = require("./data/helpers/projectModel.js")

const PORT = 4000;
const server = express(); // creates the server

// handle requests to the root of the api, the / route
server.get('/', (req, res) => {
  res.send(`Hello from Express on ${PORT}`);
});

server.get('/api/projects', (req, res) => {
  projects
  .get()
    .then(projects => {
      res
        .status(200)
        .json(projects)
    })
    .catch(err => {
      res
        .status(500)
        .json({error: "The projects could not be retrieved"})
    })
});

server.get('/api/projects/:id', (req,res) => {
  const { id } = req.params;
  projects
    .get(id)
      .then(project => {
        if(project){
          res.json(project)
        }else {
          res
          .status(500)
          .json({message: "project could not be found"})
        }
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: "The post information could not be retrieved." });
    });     
})

// watch for connections on port 4000
server.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);