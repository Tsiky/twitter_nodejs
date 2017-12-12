var express = require('express');
var router = express.Router();
var t = require('../../twitter/twitter_connection');



router.get('/', function(req, res, next) {	
	if(req.query.limit > -1)
		res.send('Get suggested users (limit = '+req.query.limit+') based on following / followed relations, not interests');
	else
		res.send('Get suggested users based on following / followed relations, not interests');		
});

module.exports = router;