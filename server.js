var express = require('express');
var app = express();
var https = require("https");
var timer = require("./node_modules/timer/timer");
var fs = require("fs");
var http = require('http');
var server = http.createServer(app);
var bodyParser = require('body-parser');


app.set('port', (process.env.PORT || 5000));
      var cnnJson = 'Json comes here';
      var cnnUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc';
      var lastUpdate = "00:00:00 - dd/mm/yyyy";
      var history = [];   //previous requests
      var glutt = '';

app.use(bodyParser.urlencoded({  extended: true }));
app.use(bodyParser.json());

app.post('/admin/refresh', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  console.log(req.body, 'It worked!');
  getcnn();
  res.redirect(303, '/admin');
});

app.get('/admin', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('freaks.ejs',{glutt: glutt, lastUpdate: lastUpdate});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(app.get('port'), () => {
  console.log('We are live on port: ', app.get('port'));
  getcnn();
});



var getcnn = function(){
      https.get(cnnUrl, (res) => {
        var body = '';
        res.on('data', function(chunk){
          body += chunk;
        });

        res.on('end', function(){
            cnnJson = JSON.parse(body);
            console.log(JSON.stringify(cnnJson).substring(1, 14).replace(/"/g, " "));
            lastUpdate = timer.timer();
            console.log('last update :', lastUpdate);
            glutt  =  (JSON.stringify(cnnJson)).replace(/,|}|]/g, "<br>");

              });

        }).on('error', function(e){
            console.log('Got an error', e);
  });
}
