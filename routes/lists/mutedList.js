var express = require('express');
var router = express.Router();
var t = require('../../twitter/twitter_connection');
var async = require('async');


router.post('/', function (req, res, next) {
    //delete any previous list named "MutedUsers"
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
                                                a = addLink(data);
                                                res.status(200).send(a);
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
    if (list.name == "MutedUsers") {
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

function addLink(data) {
    return json({ id: data.id_str }, [
        { rel: "self", method: "GET", href: 'http://localhost:3000/lists?list_id=' + data.id },
        { rel: "changePrivate", method: "POST", title: 'mode Privare', href: 'http://localhost:3000/lists?list_id=' + data.id +"&mode=private"}
    ]);
}

function json(object, links) {
    // grab the object and avoid updating reference.
    var jsonObject = JSON.parse(JSON.stringify(object));
    // either add to existing links collection or add new collection
    jsonObject.links = (jsonObject.links) ? jsonObject.links.concat(links) : jsonObject.links = links;
    return jsonObject;
}

module.exports = router;