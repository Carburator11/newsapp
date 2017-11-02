    var express = require('express');
    var app = express();
    var https = require("https");
    var timer = require("./my_modules/timer/timer.js");
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

    var resultArray = []; //DO NOT modify ! harcoded in the result callback function

    var date = timer.dateShort();
    var lastUpdate = timer.dateFull();
    var history = {};


    console.log("timer:    "+ date)

    app.set('port', (process.env.PORT || 5000));
    app.use(bodyParser.urlencoded({  extended: true }));
    app.use(bodyParser.json());

    app.post('/admin/refresh', function(req, res) {
      console.log('Refresh!');
      res.redirect(303, '/admin');
      //res.setHeader('Content-Type', 'text/html');
      //getJson(inputArray, result);
      //res.end();
    });

    app.post('/admin/save/:id', function(req, res) {
      console.log(req.body, 'saving dataset!');
      save(resultArray, req.params.id);
      res.redirect(303, '/admin');
    });


    app.get('/admin', function(req, res) {
      //res.setHeader('Content-Type', 'text/html');
      getJson(inputArray, result);
      res.render('admin.ejs',{date: date, resultArray: resultArray, lastUpdate: lastUpdate});

    });

    app.get('/:id', function(req, res) {
      //res.setHeader('Content-Type', 'text/html');
      //res.send("hello!");
      var object = require('./data/' + req.params.id + '.json');
      res.send(JSON.stringify(object));
      //res.render('pageview.ejs',{id:req.params.id, resultArray: resultArray, lastUpdate: lastUpdate, object: object});
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






    //external
    var count = 0;

    //http request via request module
    function getJson(array, callback){

      request({
          url: array[count][Object.keys(array[count])],  //"simplest" way I found to iterate through array of object containing the urls
          json: true,
          callback:callback
          }, function(error, response, body) {
              if(count ==0){resultArray = [];}
              //console.log("retrieving...  task " + count);
              //console.log("url: "+ array[count][Object.keys(array[count])])
              //var articles = body;
              callback(body);
          });
    }

    var result = function(e){
      resultArray.push(e);
      console.log(  JSON.stringify(e).substring(0, 23).replace(/:|{|}|"/g," ") + e.source);
      lastUpdate = timer.dateFull();


      count++;                          //count is a global variable
      if(count == inputArray.length){   //hardcoded inputArray as it's not a parameter of the callback/result function..

        //console.log("END of loop: " + JSON.stringify(resultArray).substring(0, 124));
        count = 0;
        //console.log("count reinitialized to:" + count)     //count is reinitialized here
        }

      else {
        getJson(inputArray, result);
      }

      };

function save(e, id){

    //console.log(  JSON.stringify(e).substring(0, 23).replace(/:|{|}|"/g," ") + e.source);
    lastUpdate = timer.dateFull();
    console.log("okay ! " +  JSON.stringify(e));
      fs.writeFile("data/"+ id +".json", JSON.stringify(e), function (err) {
        if (err) throw err;
      });


};
