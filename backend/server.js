var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var app = express();

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.get('/tickets', function(request, result) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) { throw err };
    var filter = request.query.filter ? JSON.parse(request.query.filter) : {};
    db.db("my-test").collection('tickets').find(filter)
      .toArray(function (err, res) {
        if (err) { throw err };
        result.jsonp(res);
        db.close();
      });
  });
});

app.listen(1980, function () {
   console.log("Server is running...")
})