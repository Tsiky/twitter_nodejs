var express = require('express');
var router = express.Router();
var t = require('../../twitter/twitter_connection');
var async = require('async');


router.post('/', function (req, res, next) {
    //delete any previous list named "NutedUsers"
    //get all lists owned by the authenticated user
    t.get('lists/ownerships', function (err, data, response) { 
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            var all_lists = data.lists;
            var calls = []; // Array of calls to function removeIfSame
            for (var i = 0; i < all_lists.length; i++) {
                calls.push(removeIfSame.bind(null, all_lists[i]))
            }
 
            // Check all lists in parallel removing the once called "mutedUsers" and wait for the response of all the calls
            async.parallel(
                calls,
                function (err, results) {
                    if (err) {
                        res.status(err.statusCode).send(err.message);
                    }
                    else {
                        //get all muted users
                        t.get('mutes/users/ids', {}, function (err, data, response) {
                            if (err) {
                                res.status(err.statusCode).send(err.message);
                            }
                            else {
                                ids = data.ids;
                                if (ids.length > 100) {
                                    ids = ids.slice(0, 99);
                                }
                                users = ids.join(",");
                                //create empty list
                                t.post('lists/create', { name: "MutedUsers" }, function (err, data, response) {
                                    if (err) {
                                        res.status(err.statusCode).send(err.message);
                                    }
                                    else {
                                        list_slug = data.slug;
                                        owner_id = data.user.id;
                                        //add muted users to the created list
                                        t.post('lists/members/create_all', { slug: list_slug, owner_id: owner_id, user_id: users }, function (err, data, response) {
                                            if (err) {
                                                res.status(err.statusCode).send(list_slug + " " + owner_id);
                                            }
                                            else {
                                                res.status(200).send(data);
                                            }
                                        }); 
                                    } 
                                });
                            } 
                        });
                    } 
                }); 
            }
        });
    }); 

function removeIfSame(list, callback) {
    if (list.name === "MutedUsers") {
        list_slug = list.slug;
        list_owner = list.user.id; 
        t.post('lists/destroy', { slug: list_slug, owner_id: list_owner }, function (err, data, response) {
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
}

module.exports = router;