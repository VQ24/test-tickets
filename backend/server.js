var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
var ObjectID = require('mongodb').ObjectID

var app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

app.put('/ticket', function(request, result) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    let ticket = JSON.parse(body)
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) { throw err };
      let {_id, ...newTick} = ticket;
      db.db("my-test").collection('tickets').updateOne({"_id": ObjectID(ticket._id)}, {$set: newTick}, function(err, res) {
        if (err){ throw err; }
        result.jsonp({status: 'ticket updated'});
      });
      db.close()
    });
  });
});

app.get('/tickets', function(request, result) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) { throw err };
    var filter = request.query.filter ? JSON.parse(request.query.filter) : {};
    db.db("my-test").collection('tickets').find(filter)
      .toArray(function (err, res) {
        if (err) { throw err };
        result.jsonp(res);
      });
    db.close();
  });
});

app.delete('/ticket', function(request, result) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) { throw err };
    var ticket = request.query ? request.query : {};
    db.db("my-test").collection('tickets').deleteOne({"_id": ObjectID(ticket._id)}, function(err, res) {
      if (err){ throw err; }
      result.jsonp({status: 'ticket# ' + ticket._id + ' deleted'});
    });
    db.close();
  });
});

app.listen(1980, function () {
   console.log("Server is running...")
})