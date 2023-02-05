var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.render('login')
});

// app.post('/', function (req, res) {
//   res.render('home')
// });
app.post('/', function (req, res) {
  var x = req.body.username;
  var y = req.body.password;
  //var z = { user: x, password: y };
  console.log( { user: req.body.username , password: req.body.password });
  var MongoClient = require('mongodb').MongoClient;
  MongoClient.connect("mongodb://127.0.0.1:27017", function (err, client) {
    if (err) throw err;
    var db = client.db('myDB');
    db.collection('userInfo').insertOne( { user: req.body.username , password: req.body.password } );
    res.render('home');
  });
});

/*var MongoClient = require('mongodb').MongoClient;
MongoClient.connect("mongodb://127.0.0.1:27017",function(err,client){
  if (err) throw err;
  var db = client.db('myDB');
  db.collection('FIRST_COLLECTION').insertOne({id:1,firstName: 'tyty',lastName: 'rtrt'});
});*/

app.listen(3000);
