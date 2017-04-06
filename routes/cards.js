////--------------------- Cards fetch API -----------------------------////
var express = require('express');
var router = express.Router();

var db=require('../config/dbaccess.js').Datastore;

router.get('/', function(req, res, next) {
  db.find({},{_id:1,"name":1,"photo":1,"age":1,"city":1,"gender":1,"symptoms":1,"attachments.base":1,"prescription.date":1})
    .sort({"prescription.date":-1})
    .exec(function(err,docs){
      
      //------- get latest symptom's info and priscription date ----------//
      var arr=docs;
      for(i in arr)
      {
        if("prescription" in arr[i]){
        var latest_visit= new Date(Math.max.apply(null,arr[i].prescription.date));
        //delete arr[i].prescription.date;
        arr[i].prescription["date"]=latest_visit;
        
      }
      if("symptoms" in arr[i]){
        var d=-1;
        for(a in arr[i].symptoms)
        {
          if("info" in arr[i].symptoms[a])
          {
            d=a;
            break;
          }
        }
        for(a in arr[i].symptoms)
        {
            if("info" in arr[i].symptoms[a])
            if(arr[i].symptoms[a].date>arr[i].symptoms[d].date)
            {
                d=a;
            }
        }
        if(d!=-1)
        arr[i].symptoms={'info': arr[i].symptoms[a]["info"] };
        else{
          delete arr[i].symptoms;
        }
        }
      }
      //-----------------------------------------------------------------//
    
  
      res.json(docs);
  })
});

module.exports = router;
////-------------------------------------------------------------------////