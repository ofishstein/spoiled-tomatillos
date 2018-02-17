const express = require('express');
const router = express.Router();

const mysql = require('mysql');

function query(q, onQ) {
  let connection = mysql.createConnection({
    host     : 'cs4500-spring2018-fishstein.cxjizgp7es7a.us-west-2.rds.amazonaws.com',
    user     : 'ofishstein',
    password : 'cs4500db',
    database : 'cs4500_spring2018_fishstein'
  });
  connection.connect();
  connection.query(q, onQ);
  connection.end();
}



/* GET hello string. */
router.get('/hello/string', function(req, res) {
  res.send('Hello, World!');
});

/* GET hello string. */
router.get('/hello/object', function(req, res) {
  let r = {'message': 'Hello, World!'};
  res.send(r);
});

router.post('/hello/insert', function(req, res) {
  let q = 'INSERT INTO hello (id, message) VALUES (NULL,\'Hello Team 22\');';
  query(q, function (err) {
    if (err) {
      console.log(q);
      throw err;
    }
  });
  res.send('Success!');
});

// Post a parameterized string to db
router.post('/hello/insert/:msg', function(req, res) {
  let msg = req.params.msg;
  let q = 'INSERT INTO hello (id, message) VALUES (NULL,\'' + msg + '\');';
  query(q, function (err) {
    if (err) throw err;
  });
  res.send('Success!');
});

router.get('/hello/select/all', function(req, res) {
  query('SELECT * from hello;', function (err, rows) {
    if (err) throw err;
    res.send(rows);
  });
});


module.exports = router;
