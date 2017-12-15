var express = require('express');
var router = express.Router();
var async = require('async');
var t = require('../../twitter/twitter_connection');

router.put('/', function (req, res, next) {
    if (req.query.id == null) {
        message = "Wrong parameters: id needed"
        res.status(400).send(message);
    }
    else {
        t.get('lists/ownerships', function (err, data, response) {
            if (err) {
                res.status(err.statusCode).send(err.message);
            }
            else {
                var all_lists = data.lists;
                var calls = []; // Array of calls to function addUser
                for (var i = 0; i < all_lists.length; i++) {
                    calls.push(removeUser.bind(null, all_lists[i], req.query.id))
                }

                // Delete from all the lists in parallel and wait for the response of all the calls
                async.parallel(
                    calls,
                    function (err, results) {
                        if (err) {
                            res.status(err.statusCode).send(err.message);
                        }
                        else {
                            res.send(202);
                        }
                    });
            }
        });
    }
});

function removeUser(list, userid, callback) {
    list_slug = list.slug;
    list_owner = list.user.id;
    t.post('lists/destroy', { user_id: userid, slug: list_slug, owner_id: list_owner }, function (err, data, response) {
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