    var express = require('express');
    var app = express();
    var https = require("https");
    var timer = require("./my_modules/timer/timer.js");
    var http = require('http');
    var bodyParser = require('body-parser');
    var async = require('async');
    var request = require('request');


    var sources = {
          cnn:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
          bbc:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
          guardian:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
          othersource: "otherurls..."};

    var resultArray = [];




    app.set('port', (process.env.PORT || 5000));
          var cnnJson = 'Json comes here';
          var cnnUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc';
          var lastUpdate = "00:00:00 - dd/mm/yyyy";


    app.use(bodyParser.urlencoded({  extended: true }));
    app.use(bodyParser.json());

    app.post('/admin/refresh', function(req, res) {
      console.log(req.body, 'It worked!');
      getcnn(sources.cnn);
      res.redirect(303, '/admin');
    });

    app.get('/admin', function(req, res) {
      res.setHeader('Content-Type', 'text/html');
      res.render('freaks.ejs',{outpuJson: outputJson, lastUpdate: lastUpdate});
    });

    app.use(function(req, res, next){
        res.setHeader('Content-Type', 'text/plain');
        res.status(404).send('Page introuvable !');
        res.status(503).send('Page introuvable, erreur 503');
    });

    app.listen(app.get('port'), () => {
      console.log('We are live on port: ', app.get('port'));
      getcnn(sources.cnn);
    });


    //http request
    var getcnn = function(url){
          https.get(url, (res) => {
            var body = '';
            res.on('data', function(chunk){
              body += chunk;
            });

            res.on('end', function(){
                cnnJson = JSON.parse(body);
                console.log(JSON.stringify(cnnJson).substring(1, 14).replace(/"/g, " "));
                lastUpdate = timer.timer();
                console.log('last update :', lastUpdate);
                outputJson  =  (JSON.stringify(cnnJson)).replace(/,|}|]/g, "<br>");

                  });

            }).on('error', function(e){
                console.log('Got an error', e);
      });
    }

    //http request via request module
    function getJson(url, callback){
      request({
          url: url,
          json: true,
          callback:callback
          }, function(error, response, body) {

              var articles = body.articles;
              // or by case, depending on what you want resultArray = resultArray.concat(articles);
              callback(articles);
          });
    }

    var result = function(e){
      resultArray.push(e);
      console.log(JSON.stringify(resultArray).substring(0, 114));
      };

    getJson(sources.cnn, result);
