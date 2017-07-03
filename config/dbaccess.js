var Datastore = require('nedb'); 
var os= require('os');
var path=require('path');
var dbFolder='documents/HomeopathyDatabase/';
var DatabaseFile=path.join(os.homedir(),dbFolder+'PatientsRecord.json');
module.exports={ profile_pic_path :path.join(os.homedir(),dbFolder+"Attachments/"),
                 dbFolder:path.join(os.homedir(),dbFolder),
                 Datastore: new Datastore(
                    {
                        filename: DatabaseFile, 
                        autoload: true
                    }),
                    Database:DatabaseFile
                };
