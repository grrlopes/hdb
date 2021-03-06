"use strict";
var express = require('express');
var excar = require('express-load');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cookieParser = require('cookie-parser');
let session = require('express-session');
let compression = require('compression');
let mongoose = require('mongoose');
let frotator = require('file-stream-rotator');
let fs = require('fs');
let app = express();
mongoose.connect('mongodb://localhost/historydb', function(err){
  if(err)console.error('Erro ao conectar no mongodb: ' + err);
});
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Methods","get,post");
  res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(compression());
app.use(cookieParser());
app.use(session({
secret: 'namiradohdb',
resave: true,
saveUninitialized: true}));
let log = __dirname + '/log'
fs.existsSync(log) || fs.mkdirSync(log)
let acessolog = frotator.getStream({
date_format: 'DD-MM-YYYY',
filename: log + '/acesso-%DATE%.log',
frequency: 'daily',
verbose: false});
app.use(morgan('combined', {stream: acessolog}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public'));
excar('models').then('controllers')
.then('routes').into(app);
app.use(function (req, res, next) {
res.header("X-powered-by","x-web-black");next()});
module.exports = app;
