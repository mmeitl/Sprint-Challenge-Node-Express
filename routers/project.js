const express = require('express');
const projects = require("../data/helpers/projectModel.js");
const actions = require("../data/helpers/actionModel.js");
const router = express.Router();


// handle requests to the root of the api, the / route

  
  router.get('/', (req, res) => {
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
  
  router.get('/:id', (req,res) => {
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
  });

  router.get('/actions/:projectId', (req, res) => {
      const { projectId } = req.params;
      projects.getProjectActions(projectId)
      .then(projectActions => {
          res.status(200).json(projectActions)
      })
      .catch(err => {
          res
          .status(500)
          .json({error:"The projects action could not be retrieved"})
      })
  })

  router.post('/', (req, res) => {
    const {name, description, completed} = req.body;
    projects.insert({name, description, completed})
      .then(() => {
          projects
          .get()
          .then(projects => {
              res
              .status(200)
              .json(projects)
          })
      })
      .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be processed." });
      });     
  

})  



  module.exports = router;