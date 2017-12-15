var express = require('express');
var router = express.Router();
var async = require("async");
var t = require('../../twitter/twitter_connection');


router.delete('/', function (req, res, next) {
    var calls = [];
    var delCalls = [];
    var id = '937282481740566533';
    //Get all the lists that the authenticated user owns
    t.get('lists/ownerships', {user_id: id}, function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        } else {
            //the name of the user you want to delete list he's in
            var strQuery = req.query.name;
            data.lists.forEach(function (element) {
                calls.push(getMembers.bind(null, element.id_str));
            });
            //Get all the members of your lists in parallel
            async.parallel(
                    calls,
                    function (err, results) {
                        if (err) {
                            res.status(err.statusCode).send(err.message);
                        } else {
                            results.forEach(function (element) {
                                element.data.users.forEach(function (el) {
                                    if (el.screen_name === strQuery)
                                        delCalls.push(deleteList.bind(null, element.id));
                                });
                            });
                            //Delete all the matching lists in parallel
                            async.parallel(
                                    delCalls,
                                    function (err, results) {
                                        if (err) {
                                            res.status(err.statusCode).send(err.message);
                                        } else {
                                            res.status(200).send(results);
                                        }
                                    });

                        }
                    });
        }
    });
});

router.get('/', function (req, res, next) {
    t.get('lists/show', { list_id: req.query.list_id }, function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(200).send(data);
        }
    });
});

router.post('/', function (req, res, next) {
    t.post('lists/update', { list_id: req.query.list_id, mode: req.query.mode }, function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        } else {
            res.status(200).send(data);
        }
    });
});



function getMembers(id, callback) {
    t.get('lists/members', {list_id: id}, function (err, data, response) {
        if (err) {
            console.log(err);
            callback(err, null);
        } else {

            callback(null, {id: id, data: data});
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
