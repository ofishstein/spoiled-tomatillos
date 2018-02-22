/* All database interaction handled here. */

const mysql = require('mysql');

const connection = mysql.createConnect({
  host: 'localhost', // TODO: Use Tomatillo sql server
  user: 'spoiledTomatillos', //TODO: Not sure what user to use here
  password: 'secret_here', // TODO: Security???
  database: 'SpoiledTomatillos DB', // TODO: Actual database here.
});

connection.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected!');
});

exports.get_session = () => {return connection};
