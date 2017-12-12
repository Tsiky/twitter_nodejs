var express = require('express');
var router = express.Router();
var t = require('../../twitter/twitter_connection');

router.get('/', function (req, res, next) {
    res.send('Get trends (max = ' + req.query.limit + ') among followed people\'s tweet');
});

module.exports = router;