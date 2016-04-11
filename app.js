var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');
var play = require('./routes/play');
var login = require('./routes/login');
var register = require('./routes/register');
var game = require('./routes/game');
var start_game = require('./routes/start_game');
var game_user = require('./routes/game_user');
var game_grid = require('./routes/game_grid');

var server_module = require('./helpers/server_module.js');


var session = require('express-session');
var app = express();


app.use(cookieParser('secret'));
app.use(session({cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true, secret: "123"}));
app.use(flash());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'helpers')));
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(function(user, done) {
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


app.use('/', routes);
app.use('/play', play);
app.use('/users', users);
app.use('/login', login);
app.use('/register', register);
app.use('/game', game);
app.use('/start_game', start_game);
app.use('/game_user', game_user);
app.use('/game_grid', game_grid);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
