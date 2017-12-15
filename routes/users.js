var express = require('express');
var router = express.Router();
var async = require('async');
var t = require('../twitter/twitter_connection');

router.get('/', function(req, res, next) {	
	
	if(req.query.id > -1) {

    	t.setCredentials(req.headers).get('users/show', { user_id: req.query.id },  function (err, data, response) {
	        if (err) {
	            res.status(err.statusCode).send(err.message);
	        }
	        else {
	        	res.status(200).send(data);
	        }
    	});	
	}
	else
		res.send('The param "id" is required');
});

module.exports = router;
