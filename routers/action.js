const express = require('express');
const projects = require("../data/helpers/projectModel.js");
const actions = require("../data/helpers/actionModel.js");
const router = express.Router();


// handle requests to the root of the api, the / route

  
  router.get('/', (req, res) => {
    actions
    .get()
      .then(actions => {
        res
          .status(200)
          .json(actions)
      })
      .catch(err => {
        res
          .status(500)
          .json({error: "The actions could not be retrieved"})
      })
  });
  
  router.get('/:id', (req,res) => {
    const { id } = req.params;
    actions
      .get(id)
        .then(action => {
          if(action){
            res.json(action)
          }else {
            res
            .status(500)
            .json({message: "action could not be found"})
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ error: "The post information could not be retrieved." });
      });     
  });

  router.post('/', (req, res) => {
      const {project_id, description, notes, completed} = req.body;
      actions.insert({project_id, description, notes, completed})
        .then(() => {
            actions
            .get()
            .then(actions => {
                res
                .status(200)
                .json(actions)
            })
        })
        .catch(err => {
            res
              .status(500)
              .json({ error: "The post information could not be processed." });
        });     
    
  
  })

  router.delete(`/:actionId`, (req,res) => {
    const {actionId} = req.params
    actions.remove(actionId)
      .then(() => {
        actions.get()
          .then(actions => {
            res.json(actions)
        })
    })

    .catch(err => {
        res
          .status(500)
          .json({ error: "The action could not be deleted" });
    });     
    
 })


 router.put(`/:actionId`, (req,res) => {
    const {actionId} = req.params
    const {project_id, description, notes, completed} = req.body;
    actions.update(actionId, {project_id, description, notes, completed})
      .then(() =>{
        actions.get()
          .then(actions => {
            res.json(actions)
        })
    })
    
    .catch(err => {
        res
          .status(500)
          .json({ error: "The action could not be updated." });
    });     
    
})


  module.exports = router;