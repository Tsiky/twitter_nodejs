var express = require('express');
var router = express.Router();
var async = require('async');
var t = require('../../twitter/twitter_connection');


router.get('/', function(req, res, next) {
	t.get('search/tweets', { q: req.query.q},  function (err, data, response) {
		if (err) {
			res.status(err.statusCode).send(err.message);
		}
		else { 
			usersFromHT = [];
        	for (var i = 0; i < data.statuses.length; i++) {
        		usersFromHT.push(data.statuses[i].user.id_str);
        	}
        	usersFromHT = [...new Set(usersFromHT)];
        	
        	var calls3 = []; 
			for (var i = 0; i < usersFromHT.length; i++) {
				calls3.push(addLinks.bind(null, usersFromHT[i]))
			}
			async.parallel(
					calls3,
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

function addLinks(id, callback) {

	callback(null, json({ id: id }, [
		{ rel: "self", method: "GET", href: 'http://localhost:3000/users?id='+id },
		{ rel: "follow", method: "POST", title: 'Follow user', href: 'http://localhost:3000/friendships?id=' + id }
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