var express = require('express');
var router = express.Router();
var t = require('../twitter/twitter_connection');

router.get('/', function(req, res, next) {
    res.send('return all the lists of the authenticated user (not in swagger)');
});

router.post('/mutedList', function(req, res, next) {
	 res.send('Adds a list of all musted users');
});

router.put('/addUser', function(req, res, next) {
    res.send('Add a user to all lists of the authenticated user');
});

router.put('/removeUser', function(req, res, next) {
    res.send('Remove a user to all lists of the authenticated user');
});

router.delete('/:str_query', function(req, res, next) {
    res.send('Delete all lists of tweets containing the query string ('+req.params.str_query+')');
});



module.exports = router;