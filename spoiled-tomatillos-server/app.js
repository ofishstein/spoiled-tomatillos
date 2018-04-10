const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport');
const session  = require('express-session');

const index   = require('./routes/index');
const users   = require('./routes/users');
const reviews   = require('./routes/reviews');
const recommendations   = require('./routes/recommendations');
const movies  = require('./routes/movies');
const api     = require('./routes/api');
const watchlist = require('./routes/watchlists');
const notifications = require('./routes/notifications');
const cors    = require('cors');


const app = express();
app.use(cors({
  origin: ['http://localhost:8080',
    'http://localhost:80',
    'http://localhost:4200',
    'http://ec2-18-216-127-101.us-east-2.compute.amazonaws.com'],
  credentials: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'this is supposed to be a secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/api', api);
app.use('/api/users', users);
app.use('/api/movies', movies);
app.use('/api/reviews', reviews);
app.use('/', watchlist);
app.use('/api/recommendations', recommendations);
app.use('/api/notifications', notifications);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// TODO: set API key to be env var instead of hardcoded
app.omdbApiKey = '3f811d1c';

module.exports = app;
