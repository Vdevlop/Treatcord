var Datastore = require('nedb'); 
var os= require('os');
var path=require('path');
var DatabaseFile=path.join(os.homedir(),'documents/HomeopathyDatabase/PatientsRecord.json');
module.exports={ profile_pic_path :path.join(os.homedir(),"documents/HomeopathyDatabase/Attachments/"),
                 Datastore: new Datastore(
                    {
                        filename: DatabaseFile, 
                        autoload: true
                    }),
                    Database:DatabaseFile
                };
