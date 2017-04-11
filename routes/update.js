////--------------- patient records updation API --------------------////

var express = require('express');
var router = express.Router();
var fs = require('fs-extra');
var mime = require('mime');
var path = require('path');
//------------------------------configuration--------------------------------//
var fileupload= require('../config/upload_config.js');
var dbaccess=require('../config/dbaccess.js');
var db = dbaccess.Datastore;
var upload_path=dbaccess.profile_pic_path;
//---------------------------------------------------------------------------//

router.post('/:id/update/followups', function(req, res, next) {
  var ide=String(req.params.id);
  db.update({_id: ide},
  {
      $push:{"prescription":{"info":req.body.info,"date":new Date()}}
  },
 
  function(err){
    if(!err)
    res.send("success");
    else
    res.send(err);});

  });
router.post('/:id/update/personals',fileupload.any(), 
  function(req, res, next) {
  var ide=String(req.params.id);
  console.log(JSON.stringify(req.files));
  console.log(JSON.stringify(req.body.attachments));
  
  if(req.body.name)      db.update({_id: (ide)},{$set:{name:(req.body.name)}});
  if(req.body.age)       db.update({_id: (ide)},{$set:{age:(req.body.age)}});
  if(req.body.gender)    db.update({_id: (ide)},{$set:{gender:(req.body.gender)}});
  if(req.body.city)      db.update({_id: (ide)},{$set:{city:(req.body.city)}});
  if(req.body.state)     db.update({_id: (ide)},{$set:{state:(req.body.state)}});
  if(req.body.address)   db.update({_id: (ide)},{$set:{address:(req.body.address)}});
  if(req.body.comments)  db.update({_id: (ide)},{$set:{comments:(req.body.comments)}});
  if(req.body.phone1)    db.update({_id: (ide)},{$addToSet:{mobile:req.body.phone1}});
  if(req.body.phone2)    db.update({_id: (ide)},{$addToSet:{mobile:req.body.phone2}});
   
  //------------ if any attachment is found ------//
  //convert the file name to id of the patient
  //append file extention corresponding to mimetype
  db.find({_id:( ide)},{_id:1,"name":1,"attachments":1}).exec(function(err,doc){
    console.log('oh yeah!'+JSON.stringify(doc)+'!!!!!!!!!!!!');
  var _attachments=[];


  
  if(doc[0].attachments)
  var index=doc[0].attachments.length;
  else
  var index=0;
  req.files.forEach(function(file){
    index++;
    var final_dest=upload_path + ide +'\\'+ index + '-'+file.originalname;
    fs.move(file.path, final_dest,function(err){console.log(err)});
    _attachments.push({path:path.parse(final_dest),'mimetype':file.mimetype,'size':file.size});
    
  });
  //----------------------------------------------//
  db.update({_id: (ide)},{
  $addToSet:{
    attachments:{$each:_attachments},
    }
  },  
 function(err){
   
    if(!err)
    res.send("success");
    else
    res.send(err);
  });
    
  });

});


  
router.post('/:id/update/symptoms', function(req, res, next) {
  var ide=String(req.params.id);
  //res.send(JSON.parse(req.body.NewSymptoms));
  var NewSymp=[];
 var parsedArray=(req.body);
  console.log(JSON.stringify(req.body)+' yeah bad');
  console.log(JSON.stringify(req.headers)+' yeah bad');

  for(var i in parsedArray)
  {
    NewSymp.push(parsedArray[i]);
  }
  console.log(JSON.stringify(NewSymp)+' yeah cool');
  db.update({_id: ide},
  {
        $addToSet:{
          symptoms:{$each:NewSymp}
        } 
  },

  function(err){
    if(!err)
    res.send("success");
    else
    res.send(JSON.stringify(err));
  });
  });

module.exports = router;
////-------------------------------------------------------------------////