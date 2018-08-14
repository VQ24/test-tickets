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

app.post('/ticket', function(request, result) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    let ticket = JSON.parse(body)
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) { throw err };
      db.db("my-test").collection('tickets').insertOne(ticket, function(err, res) {
        if (err){ throw err; }
        result.jsonp({ticket: ticket, status: 'created'});
      });
      db.close()
    });
  });
});

app.post('/category', function(request, result) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    let category = JSON.parse(body)
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) { throw err };
      db.db("my-test").collection('categories').insertOne(category, function(err, res) {
        if (err){ throw err; }
        result.jsonp({category: category, status: 'created'});
      });
      db.close()
    });
  });
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

app.put('/category', function(request, result) {
  let body = '';
  request.on('data', chunk => {
    body += chunk.toString();
  });
  request.on('end', () => {
    let category = JSON.parse(body)
    MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
      if (err) { throw err };
      let {_id, ...newCat} = category;
      db.db("my-test").collection('categories').updateOne({"_id": ObjectID(category._id)}, {$set: newCat}, function(err, res) {
        if (err){ throw err; }
        result.jsonp({status: 'category updated'});
      });
      db.close()
    });
  });
});

app.get('/tickets', function(request, result) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) { throw err };
    var filter = request.query.filter ? JSON.parse(request.query.filter) : {};
    var filterNew1 = filter.length ? JSON.parse(JSON.stringify({"category": {"$in": JSON.parse(filter).map(item => ObjectID(item))}})) : {};
    db.db("my-test").collection('tickets').find(filterNew1)
      .toArray(function (err, res) {
        if (err) { throw err };
        result.jsonp(res);
      });
    db.close();
  });
});

app.get('/categories', function(request, result) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) { throw err };
    var filter = request.query.filter ? JSON.parse(request.query.filter) : {};
    db.db("my-test").collection('categories').find(filter)
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

app.delete('/categories', function(request, result) {
  MongoClient.connect(url, {useNewUrlParser: true}, function(err, db) {
    if (err) { throw err };
    var categories = request.query.filter ? JSON.parse(request.query.filter) : {};
    var removeQuery = { _id: { $in: categories.map(cat => ObjectID(cat))} };
    db.db("my-test").collection('categories').remove(removeQuery, function(err, res) {
      if (err){ throw err; }
      result.jsonp({status: 'categories deleted'});
    });
    db.close();
  });
});

app.listen(1980, function () {
  (function() {
    var P = [
      "\x1b[36m Server is running \x1b[37m.  ",
      "\x1b[36m Server is running \x1b[37m.. ",
      "\x1b[36m Server is running \x1b[37m...",
      "\x1b[36m Server is running \x1b[37m   "
    ];
    var x = 0;
    return setInterval(function() {
      process.stdout.write("\r" + P[x++]);
      x &= 3;
    }, 250);
  })();
})