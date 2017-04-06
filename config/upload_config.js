
var multer=require('multer');
var destination=require('./dbaccess.js').profile_pic_path;

//----------------------------- Upload file Validator ------------------------------//
var fileupload=multer({
  dest:destination,
  fileFilter: function (err,file,callthis)
  {
    if(file.mimetype.match(
      /^(image\/|application\/vnd\.openxmlformats|application\/vnd\.ms|application\/msapplication\/x-iwork|application\/pdf|text\/plain|application\/xml)/
      ))
    callthis(null,true);
    else{
      var Err=new Error();
      Err.name="MIME type incompatible";
      Err.message="Please upload document or image formats only";
    callthis(Err,false);
    }
  },
  limits:{
    fileSize:1024*1024*12,
    // file size allowance is set as 12mb
  }
});
//------------------------------------------------------------------------------------//

module.exports=fileupload;