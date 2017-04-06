////------------------- patient fetch API -----------------------------////
var express = require('express');
var router = express.Router();

var db=require('../config/dbaccess.js').Datastore;

router.get('/:id/get', function(req, res, next) {
  var ide=String(req.params.id);
  
  db.find({_id:ide},function(err,doc){
      if(doc.length>0)
      res.json(doc);
      else
      {
        res.send(404,"soory,no patient found with id: "+ide);    
      }
  });
  
});

router.get('/:id/delete', function(req, res, next) {
  var ide=String(req.params.id);
  db.remove({_id:ide},{},function(err,docs){
    res.sendStatus(200);
  })
});

module.exports = router;
////-------------------------------------------------------------------////