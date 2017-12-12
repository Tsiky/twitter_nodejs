var express = require('express');
var router = express.Router();
var t = require('../../twitter/twitter_connection');

router.post('/', function (req, res, next) {
    res.send('Adds a list of all musted users');
});

module.exports = router;