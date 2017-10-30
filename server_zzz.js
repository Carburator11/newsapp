var express = require('express');
var app = express();
var https = require("https");
var timer = require("./my_modules/timer/timer.js");
var http = require('http');
var bodyParser = require('body-parser');
var async = require('async');
var request = require('request');

var asyncTasks = [
    cnn:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
    bbc:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
    guardian:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
    natgeo:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
    buzzfeed:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
    googlenews: 'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc',
    bbcsport:'https://newsapi.org/v1/articles?source=cnn&sortBy?&apiKey=c6b3fe2e86d54cae8dcb10dc77d5c5fc'];
