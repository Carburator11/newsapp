var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.setHeader('Content-Type', 'text/plain');
  res.end("blablabla");
});

app.get('/freaks/:freaksnum', function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.render('freaks.ejs',{freaksnum: req.params.freaksnum});
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.status(404).send('Page introuvable !');
});

app.listen(8000, () => {
  console.log('We are live on port 8000...');
});
