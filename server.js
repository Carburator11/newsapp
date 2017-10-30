    var express = require('express');
    var app = express();
    var https = require("https");
    var timer = require("./my_modules/timer/timer.js");
    var http = require('http');
    var bodyParser = require('body-parser');
    var async = require('async');
    var request = require('request');


    var inputArray = [
          {cnn:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {bbc:'https://newsapi.org/v1/articles?source=bbc-news&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {guardian:'https://newsapi.org/v1/articles?source=the-guardian-uk&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {recode:'https://newsapi.org/v1/articles?source=recode&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'},
          {bbcsport:'https://newsapi.org/v1/articles?source=bbc-sport&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',}
        ];

    var resultArray = []; //DO NOT modify ! harcoded in the result callback function

    var date = timer.timer();
    var history = {};
    var lastUpdate = "00:00:00 - dd/mm/yyyy" ;

    app.set('port', (process.env.PORT || 5000));
    app.use(bodyParser.urlencoded({  extended: true }));
    app.use(bodyParser.json());

    app.post('/admin/refresh', function(req, res) {
      console.log(req.body, 'Refresh!');

      res.redirect(303, '/admin');
    });

    app.post('/admin/save/:date', function(req, res) {
      console.log(req.body, 'saving dataset!');

      res.redirect(303, '/admin');
    });


    app.get('/admin', function(req, res) {
      //res.setHeader('Content-Type', 'text/html');
      res.render('admin.ejs',{date: date, resultArray: resultArray, lastUpdate: lastUpdate});
    });

    app.get('/:date', function(req, res) {
      //res.setHeader('Content-Type', 'text/html');
      res.render('pageview.ejs',{date:req.params.date, resultArray: resultArray, lastUpdate: lastUpdate});
    });


    app.use(function(req, res, next){
        res.setHeader('Content-Type', 'text/plain');
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



      count++;                          //count is a global variable
      if(count == inputArray.length){   //hardcoded inputArray as it's not a parameter of the callback/result function..
        lastUpdate = timer.timer();
        //console.log("END of loop: " + JSON.stringify(resultArray).substring(0, 124));
        count = 0;
        //console.log("count reinitialized to:" + count)     //count is reinitialized here
        }

      else {
        getJson(inputArray, result);
      }

      };

function init(){
  //resultArray = [];
  //callback(inputArray, result);
  //getJson(object.bbc, result);
  //getJson(object.guardian, result);
  //getJson(object.recode, result);
  //getJson(object.bbcsport, result);
}
