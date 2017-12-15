var express = require('express');
var router = express.Router();
var async = require('async');
var t = require('../../twitter/twitter_connection');

router.post('/', function(req, res, next) {	
	
	if(req.query.number > -1) {

    	t.setCredentials(req.headers).get('followers/ids', { user_id: "" },  function (err, data, response) {
	        if (err) {
	            res.status(err.statusCode).send(err.message);
	        }
	        else {
	        	var ids = data.ids.slice(0, req.query.number);
	        	var calls = []; 
	        	for (var i = 0; i < ids.length; i++) {
	        		calls.push(followUser.bind(null, req.headers, ids[i]))
	        	}

	        	async.parallel(
	        			calls,
	        			function (err, results) {
	        				if (err) {
	        					res.status(err.statusCode).send(err.message);
	        				}
	        				else {
	        					res.status(200).send(ids);
	        				}
	        			});

	        }
    	});	
	}
	else
		res.send('The param "number" is required');
});


function followUser(headers, id, callback) {
	t.setCredentials(headers).post('friendships/create', { user_id: id }, function(err, data, response) {
        if (err) {
        	console.log(err);
            callback(err, null);
        }
        else {
        	console.log(data);
            callback(null, data);
        }
    })
}

module.exports = router;