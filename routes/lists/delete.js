var express = require('express');
var router = express.Router();
var async = require("async");
var t = require('../../twitter/twitter_connection');

router.delete('/', function (req, res, next) {
    var calls = [];
    //Get all the tweets from the authenticated user, not including his retweets
    t.get('lists/ownerships', function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        } else {
            var strQuery = req.query.name;
            //Push all the id of tweets having the query string in their text in queue for deletion
            data.forEach(function (element) {
                getMembers(element.id).forEach(function (el) {
                    if (el.name.indexOf(strQuery) !== -1)
                        calls.push(deleteList.bind(null, element.id_str));
                });
            });
            //Delete all the matching tweets in parallel
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

function getMembers(id, callback) {
    t.get('lists/member', {list_id: id}, function (err, data, response) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {

            callback(null, data);
            return data;
        }
    });
}
function deleteList(id, callback) {
    t.post('lists/destroy', {list_id: id}, function (err, data, response) {
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
