var express = require('express');
var router = express.Router();
var async = require('async');

/* GET users listing. */
router.get('/', function(req, res, next) {
	var user = {"users":
			[
				{
					name: 'Trump',
					id: '25073877'
				},
				{
					name: 'okdsofms',
					id: '5346'
				}
			]
	};

    
    
    var calls = []; // Array of calls to function deleteBlock
    for (var i = 0; i < user.users.length; i++) {
        calls.push(deleteBlock.bind(null, user.users[i]))
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
    
    
//    res.status(205).json(user, [
//        { rel: "self", method: "GET", href: 'http://127.0.0.1' },
//        { rel: "follow", method: "POST", title: 'Follow user', href: 'https://api.twitter.com/1.1/friendships/create?user_id=' + user.id }
//    ]);
    // res.send('respond with a resource');
});



function deleteBlock(user, callback) {

	callback(null, json(user, [
		{ rel: "self", method: "GET", href: 'http://127.0.0.1' },
		{ rel: "follow", method: "POST", title: 'Follow user', href: 'https://api.twitter.com/1.1/friendships/create?user_id=' + user.id }
		]));

}


function json(object, links){

    // grab the object and avoid updating reference.
    var jsonObject = JSON.parse(JSON.stringify(object));

    

        // either add to existing links collection or add new collection
        jsonObject.links = (jsonObject.links) ? jsonObject.links.concat(links) : jsonObject.links = links;

    
    return jsonObject
}

module.exports = router;
