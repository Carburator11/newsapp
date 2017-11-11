    var express = require('express');
    var app = express();
    var https = require("https");
    var timer = require("./scripts/timer.js");
    var http = require('http');
    var bodyParser = require('body-parser');
    var fs = require('fs');
    var request = require('request');


    var inputArray = [
          {cnn:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {bbc:'https://newsapi.org/v1/articles?source=bbc-news&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {guardian:'https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {recode:'https://newsapi.org/v1/articles?source=recode&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {bbcsport:'https://newsapi.org/v1/articles?source=bbc-sport&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',}
        ];

    var resultObj = {};   //DO NOT modify ! harcoded in the result callback function
                          //resultObj is initialized below in the getJson function
    var date = timer.dateShort();
    var hh = timer.hourShort();
    var currentFile = [];
    var count = 0;

    app.set('port', (process.env.PORT || 5000));
    app.use(bodyParser.urlencoded({  extended: true }));
    app.use(bodyParser.json());
    app.use(express.static(__dirname));

    app.post('/admin/refresh', function(req, res) {
      console.log('Refresh!');
      res.redirect(303, '/admin');
    });

    app.get('/admin', function(req, res) {
      getJson(inputArray, result);
      res.render('admin.ejs',{date: date, resultObj:resultObj, dirList:dirList});
    });

    app.post('/admin/save/:id', function(req, res) {
      console.log(req.body, 'saving dataset!');
      save(resultObj, req.params.id);
      res.redirect(303, '/admin');
    });

    app.get('/admin/suppr/:id', function(req, res) {
        fs.unlinkSync('data/' + req.params.id + ".json");
        jsonDir(writeDirList);
        console.log("suppressing : " + req.params.id + ".json");
        res.redirect(303, '/admin');
    });

    app.get('/admin/edit/:id', function(req, res) {
        openFile(req.params.id, processFile);
        res.redirect(303, '/admin');
    });

    app.get('/admin/preview/:id', function(req, res) {
        openFile(req.params.id, processFile);
        res.redirect(303, '/admin');
    });

    app.get('/admin/previewraw/:id', function(req, res) {
        openFile(req.params.id, processFile);
        res.redirect(303, '/admin');
    });

    app.get('/admin/quieue/:id', function(req, res) {
        console.log("  adding to queue:" + req.params.id)
        res.redirect(303, '/admin');
    });

    app.get('/admin/quieue-reset', function(req, res) {
        console.log("  queue reset")
        res.redirect(303, '/admin');
    });

    app.get('/:id', function(req, res) {
      var object = require('./data/' + req.params.id + '.json');
      //res.send(JSON.stringify(object));
      res.render('pageview.ejs',{id:req.params.id, object: resultObj});
    });


    app.use(function(req, res, next){
        res.setHeader('Content-Type', 'text/html');
        res.status(404).send('Page introuvable !');
        res.status(503).send('Page introuvable, erreur 503');
    });

    app.listen(app.get('port'), () => {
      console.log('We are live on port: ', app.get('port'));
      getJson(inputArray, result);
      });



    //http request via request module
    function getJson(array, callback){

      request({
          url: array[count][Object.keys(array[count])],  //"simplest" way I found to iterate through array of object containing the urls
          json: true,
          callback:callback
          }, function(error, response, body) {
              if(count ==0){
                let md = {    //initializing the resultObj here
                  id: timer.dateShort(),  //updated by save function if custom name provided
                  genDate: timer.dateFull(),
                  genTime: timer.now(),
                  headlines: {
                    head1:{src:"cnn", art: 0},
                    head2:{src:"the-guardian-uk", art: 0},
                    head3:{src:"bbc-news", art: 0}
                  }
                };

                resultObj = {metadata:md, content:{}};
              };


              //if(error){console.log(error);}   //error management to be added to handle offline
              if(typeof(body) == "object"){
                 var src = body.source;
                 callback(body, src);}
          });
    }

    var result = function(e, src){
        var truc = src ;
        var obj = {};

        resultObj["content"][truc] = e;
        console.log("    "+src + " : "+  JSON.stringify(e).substring(0, 14).replace(/:|{|}|"/g," ")   );
        count++;                          //count = global
          if(count == inputArray.length){   //hardcoded inputArray as it's not a parameter of the callback/result function..
                count = 0;
                jsonDir(writeDirList);
            }

      else {
        getJson(inputArray, result);  //serial loop
      }

      };

function save(e, id){
    e.metadata["genDate"] = timer.dateFull();
    e.metadata["id"] = id;
    console.log("  saving id:  " +  id);
      fs.writeFile("data/"+ id +".json", JSON.stringify(e), function (err) {
        if (err) throw err;
      });
      jsonDir(writeDirList);
};


var dirList = [];


function jsonDir(callback){
  dirList = [];
  fs.readdir('./data/', function(err,files) {
    //files.forEach(file => { callback(file);   });

    callback(files);
    console.log("    write dirList "+files);
    });
}

function writeDirList(e){
  dirList= e;  //harcoded dirList output array
  console.log("   cb: "+JSON.stringify(dirList))
}


function openFile(e, callback){
  fs.readFile("./data/"+e+".json", "utf8", function read(err, data){
      if(err){throw err}
      console.log("  openfile: ./data/"+e+".json");
      var obj = JSON.parse(data);
      callback(obj);
  })
}


function processFile(e){
  resultObj = e ;
  console.log("  open file type= " + typeof(e));
}


setInterval( function(){getJson(
  inputArray, result);
  let id = date + "auto" + "-" + hh;
  console.log(" autosaving: "+ id);
  save(resultObj, id);

}, 86400000/3);  //1day = 86400000ms



setInterval( function(){jsonDir(writeDirList);}, 5000000);
