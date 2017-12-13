var express = require('express');
var router = express.Router();
var async = require("async");
var t = require('../../twitter/twitter_connection');

router.delete('/', function (req, res, next) {
    var sn = 'Mattys';
    t.get('statuses/user_timeline', {screen_name: sn}, function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        } else {
            var strQuery = req.query.query;
            var calls = [];
            data.forEach(function (element) {

                if (element.text.indexOf(strQuery) !== -1)
                    calls.push(deleteTweet.bind(null, element.id));
            });

            // Delete all the tweets in parallel and wait for the response of all the calls
            async.parallel(
                    calls,
                    function (err, results) {
                        if (err) {
                            res.status(err.statusCode).send(err.message);
                        } else {
                            res.status(200).send(results);
                        }
                    });
        }
    });
});

// For testing
router.get('/', function (req, res, next) {
    var sn = 'Mattys';
    t.get('statuses/user_timeline', {screen_name: sn}, function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
    });
});
//    t.get('mutes/users/ids', function (err, data, response) {
//        if (err) {
//            res.status(err.statusCode).send(err.message);
//        } else {
//            res.status(200).send(data);
//        }
//    });
//});

function deleteTweet(id, callback) {
    t.post('statuses/destroy', {id: id}, function (err, data, response) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {
            console.log(data);
            callback(null, data);
        }
    });
}


module.exports = router;
