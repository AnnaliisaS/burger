const express = require('express');
const burger = require('../models/burger.js');
let router = express.Router();

router.get('/', (req, res) => {
    burger.all((data) => {
        var hbsObject ={
            burgerdb: data
        };
        res.render('index', hbsObject)
    });
});
router.post("/api/burgers", (req, res) => {

    burger.create([
      "burger_name", "devoured"
    ], [
      req.body.name, req.body.devoured
    ], (result) => {
      // Send back the ID of the new burger
      res.json({ id: result.insertId });
    });
  });

  router.put('/api/burgers/:id', (req, res) => {
      burger.update(
          {devoured: req.body.devoured}, id = req.params.id, (result) => {
              if(result.changedrows == 0){
                  return res.status(404).end();
              } else{
                  res.status(200).end();
              }
          }
          )
  })


  module.exports = router;