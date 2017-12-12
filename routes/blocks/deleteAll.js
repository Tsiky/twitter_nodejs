var express = require('express');
var router = express.Router();
var async = require('async');
var t = require('../../twitter/twitter_connection');

router.delete('/', function(req, res, next) {
    t.get('blocks/ids',  function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            var blockedIds = data.ids;
            var calls = []; // Array of calls to function deleteBlock
            for (var i = 0; i < blockedIds.length; i++) {
                calls.push(deleteBlock.bind(null, blockedIds[i]))
            }

            // Delete all the blocks in parallel and wait for the response of all the calls
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
    t.get('blocks/ids',  function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            res.status(200).send(data);
        }
    });
});

function deleteBlock(id, callback) {
    t.post('blocks/destroy', { user_id: id }, function(err, data, response) {
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
