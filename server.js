var express = require('express');
var app = express();

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end("blablabla");
});

app.get('/freaks/:freaksnum', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  var glutt = ["Molly Joe", "Ticky", "Lewis Jr"];
  res.render('freaks.ejs',{freaksnum: req.params.freaksnum, glutt: glutt});
});



app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8000, () => {
  console.log('We are live on port 8000...');
});
