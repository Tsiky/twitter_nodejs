var express = require('express');
var router = express.Router();
var t = require('../twitter/twitter_connection');

router.get('/', function (req, res, next) {
    if (req.query.id_source) {
        t.get('friendships/show', { source_id: req.query.id_source, target_id: req.query.id_target}, function (err, data, response) {
            if (err) {
                res.status(err.statusCode).send(err.message);
            }
            else {
                res.status(200).send(data);
            }
        });
    }
    else {
    t.get('friendships/lookup', { user_id: req.query.id_target }, function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            res.status(200).send(data);
        }
    });
    }
});

module.exports = router;