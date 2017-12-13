var express = require('express');
var router = express.Router();
var t = require('../../twitter/twitter_connection');


router.post('/', function (req, res, next) {
    //get all muted users
    t.get('mutes/users/ids', {}, function (err, data, response) {
        if (err) {
            res.status(err.statusCode).send(err.message);
        }
        else {
            ids = data.ids;
            // TODO: slice array, do all requests in parallel
            if (ids.length > 100) {
                ids = ids.slice(0, 99);
            }
            users = ids.join(",");
            //create empty list
            t.post('lists/create', {name : "MutedUsers"}, function (err, data, response) {
                if (err) {
                    res.status(err.statusCode).send(err.message);
                }
                else {
                    list_slug = data.slug;
                    owner_id = data.user.id;
                    //add muted users to the created list
                    t.post('lists/members/create_all', { slug:list_slug, owner_id:owner_id, user_id:users }, function (err, data, response) {
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
});

module.exports = router;