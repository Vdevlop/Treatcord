////--------------- new patient record synthesis API ---------------////
var express = require('express');
var router = express.Router();
var path=require('path');
var mime = require('mime');
var fs = require('fs');
//------------------------------configuration--------------------------------//
var fileupload= require('../config/upload_config.js');
var dbaccess=require('../config/dbaccess.js');
var db = dbaccess.Datastore;
var upload_path=dbaccess.profile_pic_path;

//---------------------------------------------------------------------------//

router.post('/add', fileupload.array('attachment'), function(req, res, next) {

  //------------ if pic attachment is found ------//
  //convert the file name to id of the patient
  //append file extention corresponding to mimetype
  var _attachments=[];
 
  //res.send(_photo);
  //----------------------------------------------//
  var contacts=[];
  if(req.body.phone1!=null)
  contacts.push(req.body.phone1);
  if(req.body.phone2!=null)
  contacts.push(req.body.phone2);
  db.insert(
  {
    name:(req.body.name),
    age:req.body.age,
    gender:req.body.gender,
    city:req.body.city,
    state:req.body.state,
    address:req.body.address,
    mobile:contacts,
    comments:req.body.comments,
  },
  function(err,doc){
    var index=0;
    
     if(!err){
       var ide=(doc["_id"]);
    if(req.files)
    {
    console.log(ide); 
    req.files.forEach(function(file){
    index++;
    var final_dest=upload_path + ide +'('+ index +')' +"."+mime.extension(file.mimetype);
    fs.renameSync(file.path, final_dest);
    //_attachments.push();
      db.update({"_id":String(doc["_id"])},{
        $addToSet:{
        attachments:path.parse(final_dest),
        }});
    });
   
    }
    
      res.json({'_id':ide});
    }
     else
    res.send(err);

  });
});

module.exports = router;
////-------------------------------------------------------------------////