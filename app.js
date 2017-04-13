
var app = require('electron').app;
var _express=require('express');
var express=_express();
var fs=require('fs');
var path = require('path');

var nedb=require('nedb'); 
var filePath=require('./config/dbaccess.js').Database;

var BrowserWindow = require('electron').BrowserWindow;
var mainWindow = null;


app.on('ready', function() {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 800,
        icon:"./favicon.png",
        title:"Homeopathy records Management Portal",
        minHeight: 390,
        minWidth: 400,
        frame:false

    });
mainWindow.on( 'page-title-updated',function(event,title){event.preventDefault()});

  //  mainWindow.setMinimumSize(200,200);
//mainWindow.setMenu(null);
mainWindow.loadURL('file://' + __dirname + '/views/index.html');
});
console.log("Database: "+(filePath));

////-----------------------------Create Database----------------------////
/*
var alreadyExists=true;
try{
    
}
catch(err)
{
    if(err)
        alreadyExists=false;
}
if(!fs.existsSync(path.format(path.parse(filePath))))
{
    var buffer = new Buffer("{}");
fs.writeFileSync(path.parse(filePath),buffer,function(err){});

/*
db.run("PRAGMA foreign_keys=ON");
db.run("CREATE TABLE IF NOT EXISTS PATIENTS(\
   PID            INT PRIMARY KEY     NOT NULL,\
   NAME           TEXT    NOT NULL,\
   AGE            INT     NOT NULL,\
   ADDRESS        TEXT,\
   STATE          TEXT,\
   CITY           TEXT,\
   PHOTO          BLOB,\
   PHONE          INT,\
   MOBILE         INT,\
   COMMENTS       TEXT)");

db.run("CREATE TABLE IF NOT EXISTS SYMPTOMS(\
    SID           INT PRIMARY KEY  NOT NULL,\
    SYMPTOMS      TEXT,\
    DOS           DATE,\
    PID           INT,\
    FOREIGN KEY(PID) REFERENCES PATIENTS(PID))");

db.run("CREATE TABLE IF NOT EXISTS PRESCRIPTION(\
    MID           INT PRIMARY KEY  NOT NULL,\
    INFO          TEXT,\
    PID           INT,\
    DOP           DATE,\
    FOREIGN KEY(PID) REFERENCES PATIENTS(PID))");
    db.run("INSERT INTO PATIENTS VALUES(2,2,3,4,5,6,7,8,9,0)");
/*
PD- PATIENT'S ID
SID-SYMPTOM'S ID
DOS-DATE OF SYMPTOMS FIRST APPEARED
DOP-DATE OF PRESCRIPTION
*/
/*
console.log("new embedded Database file created");
}

else{
    console.log('old Database already exits');
}
*/
////-------------------------------------------------------------------////


////------------------------------- Routing --------------------------////
var bodyParser = require('body-parser');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({ extended: true }));


var cards = require('./routes/cards');
var add = require('./routes/add');
var update=require('./routes/update');
var get=require('./routes/get');


// view engine setup
express.listen(8009);
express.set('view engine', 'html');

express.set('views', path.join(__dirname, 'views'));
express.use('/cards', cards);
express.use('/patients', add);
express.use('/patients', update);
express.use('/patients', get);



// catch 404 and forward to error handler
express.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

////-------------------------------------------------------------------////









