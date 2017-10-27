var express = require('express');
var app = express();
var https = require("https");

app.set('port', (process.env.PORT || 5000));

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end("blablabla");
});



var cnnUrl = 'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc';
var cnnJson = '';

https.get(cnnUrl, (res) => {
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });

    res.on('end', function(){
        cnnJson = JSON.parse(body);
        console.log('Json file scrapped: ', JSON.stringify(cnnJson).substring(1, 99), '....');
    });

}).on('error', function(e){
  console.log('Got an error', e);
  });





app.get('/freaks/:freaksnum', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  var glutt = ["Molly Joe", "Ticky", "Lewis Jr"];
  var baum  = JSON.stringify(cnnJson).substring(1, 999) + ".....     and a lot more to come";
  res.render('freaks.ejs',{freaksnum: req.params.freaksnum, glutt: glutt, baum: baum});

});




app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(app.get('port'), () => {
  console.log('We are live on port: ', app.get('port'));
});
