var express = require('express');
var router = express.Router();
var t = require('../twitter/twitter_connection');

router.get('/', function(req, res, next) {
    res.send('GET tweet');
});

router.get('/from', function(req, res, next) {
    t.get('statuses/user_timeline', { screen_name: req.query.screen_name },  function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            res.status(200).send(data);
        }
    });
});

router.post('/', function(req, res, next) {
    t.post('statuses/update', { status: req.body.message }, function(err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            res.status(200).send(data);
        }
    })
});

router.put('/', function(req, res, next) {
    res.send('PUT tweet');
});

router.delete('/', function(req, res, next) {
    res.send('DELETE tweet');
});


module.exports = router;
