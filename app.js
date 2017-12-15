var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var hateoasLinker = require('express-hateoas-links');

// Only for dev - use environment variables of .env file
require('dotenv').config();

// ADD HERE - Require routes here
var index = require('./routes/index');
var users = require('./routes/users');
var lists = require('./routes/lists');
var trendsFriendships = require('./routes/trends/friendships');
var commonFollowers = require('./routes/commonFollowers');
var lastFollowers = require('./routes/friendships/lastFollowers');
var addUser = require('./routes/lists/addUser');
var removeUser = require('./routes/lists/removeUser');
var mutedList = require('./routes/lists/mutedList');
var relationships = require('./routes/relationships');
var deleteAllBlocks = require('./routes/blocks/deleteAll');
var deleteAllMutes = require('./routes/mutes/deleteAll');
var deleteTweets = require('./routes/tweets/delete');
var deleteDirectMessages = require('./routes/directMessages/delete');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(hateoasLinker);

// ADD HERE - Add routes here
app.use('/', index);
app.use('/users', users);
app.use('/tweets', deleteTweets);
app.use('/lists', lists);
app.use('/directMessages', deleteDirectMessages);
app.use('/commonFollowers', commonFollowers);
app.use('/friendships/lastFollowers', lastFollowers);
app.use('/lists/addUser', addUser);
app.use('/lists/removeUser', removeUser);
app.use('/lists/mutedList', mutedList);
app.use('/trends/friendships', trendsFriendships);
app.use('/relationships', relationships);
app.use('/blocks', deleteAllBlocks);
app.use('/mutes', deleteAllMutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
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

module.exports = app;
