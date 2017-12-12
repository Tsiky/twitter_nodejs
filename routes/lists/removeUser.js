var express = require('express');
var router = express.Router();
var t = require('../../twitter/twitter_connection');

router.put('/', function (req, res, next) {
    res.send('Remove a user to all lists of the authenticated user');
});

module.exports = router;