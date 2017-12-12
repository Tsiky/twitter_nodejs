var express = require('express');
var router = express.Router();
var async = require("async");
var t = require('../../twitter/twitter_connection');

router.delete('/', function(req, res, next) {
    t.get('mutes/users/ids',  function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            var blockedIds = data.ids;
            var calls = []; // Array of calls to function deleteMute
            for (var i = 0; i < blockedIds.length; i++) {
                calls.push(deleteMute.bind(null, blockedIds[i]))
            }

            // Delete all the mutes in parallel and wait for the response of all the calls
            async.parallel(
                calls,
                function (err, results) {
                    if (err) {
                        res.status(err.statusCode).send(err.message);
                    }
                    else {
                        res.status(200).send(results);
                    }
                });
        }
    });
});

// For testing
router.get('/', function(req, res, next) {
    t.get('mutes/users/ids',  function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            res.status(200).send(data);
        }
    });
});

function deleteMute(id, callback) {
    t.post('mutes/users/destroy', { user_id: id }, function(err, data, response) {
        if (err) {
            console.log(err);
            callback(err, null);
        }
        else {
            console.log(data);
            callback(null, data);
        }
    });
}

module.exports = router;
