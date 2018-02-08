var express = require('express');
var router = express.Router();

var mysql = require('mysql')

function query(q, onQ) {

    var connection = mysql.createConnection({
      host     : 'cs4500-spring2018-fishstein.cxjizgp7es7a.us-west-2.rds.amazonaws.com',
      user     : 'ofishstein',
      password : 'cs4500db',
      database : 'cs4500_spring2018_fishstein'
    });
    connection.connect()
    connection.query(q, onQ)
    connection.end()
}



/* GET hello string. */
router.get('/hello/string', function(req, res, next) {
  res.send('Hello, World!');
});

/* GET hello string. */
router.get('/hello/object', function(req, res, next) {
  r = {'message': 'Hello, World!'}
  res.send(r);
});

router.post('/hello/insert', function(req, res, next) {
    q = "INSERT INTO hello (id, message) VALUES (NULL,'Hello Team 22');"
    query(q, function (err, rows, fields) {
        if (err) {
            console.log(q)
            throw err;
        }
    })
    res.send('Success!')
});

// Post a parameterized string to db
router.post('/hello/insert/:msg', function(req, res) {
    let msg = req.params.msg
    q = "INSERT INTO hello (id, message) VALUES (NULL,'" + msg + "');"
    query(q, function (err, rows, fields) {
      if (err) throw err;
    })
    res.send("Success!")
});

router.get('/hello/select/all', function(req, res) {
    query('SELECT * from hello;', function (err, rows, fields) {
      if (err) throw err;
      res.send(rows)
    })
});


module.exports = router;
